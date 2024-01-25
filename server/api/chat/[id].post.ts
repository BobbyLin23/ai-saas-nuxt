/* eslint-disable ts/no-require-imports */
import process from 'node:process'
import { LangChainStream, StreamingTextResponse } from 'ai'
import { Replicate } from '@langchain/community/llms/replicate'
import { CallbackManager } from '@langchain/core/callbacks/manager'
import dotenv from 'dotenv'
import { MemoryManager } from '~/server/utils/memory'

dotenv.config({ path: `.env` })

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const id = getRouterParam(event, 'id')
    const user = await getUser(event)

    const { prompt } = body

    if (!user || !user.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    if (!prompt) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Prompt is required',
      })
    }

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Id is required',
      })
    }

    const companion = await prisma.companion.update({
      where: {
        id,
      },
      data: {
        companionMessages: {
          create: {
            content: prompt,
            role: 'User',
            userId: user.id,
          },
        },
      },
    })

    if (!companion) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Companion not found',
      })
    }

    const name = companion.id
    const companion_file_name = `${name}.txt`

    const companionKey = {
      companionName: name!,
      userId: user.id,
      modelName: 'llama2-13b',
    }
    const memoryManager = await MemoryManager.getInstance()

    const records = await memoryManager.readLatestHistory(companionKey)
    if (records.length === 0)
      await memoryManager.seedChatHistory(companion.seed, '\n\n', companionKey)

    await memoryManager.writeToHistory(`User: ${prompt}\n`, companionKey)

    const recentChatHistory = await memoryManager.readLatestHistory(companionKey)

    const similarDocs = await memoryManager.vectorSearch(
      recentChatHistory,
      companion_file_name,
    )

    let relevantHistory = ''
    if (!!similarDocs && similarDocs.length !== 0)
      relevantHistory = similarDocs.map(doc => doc.pageContent).join('\n')

    const { handlers } = LangChainStream()

    const model = new Replicate({
      model:
        'a16z-infra/llama-2-13b-chat:df7690f1994d94e96ad9d568eac121aecf50684a0b0963b25a41cc40061269e5',
      input: {
        max_length: 2048,
      },
      apiKey: process.env.REPLICATE_API_TOKEN,
      callbackManager: CallbackManager.fromHandlers(handlers),
    })

    model.verbose = true

    const resp = String(
      await model
        .call(
          `
        ONLY generate plain sentences without prefix of who is speaking. DO NOT use ${companion.name}: prefix. 

        ${companion.instructions}

        Below are relevant details about ${companion.name}'s past and the conversation you are in.
        ${relevantHistory}


        ${recentChatHistory}\n${companion.name}:`,
        )
        .catch(console.error),
    )

    const cleaned = resp.replaceAll(',', '')
    const chunks = cleaned.split('\n')
    const response = chunks[0]

    await memoryManager.writeToHistory(`${response.trim()}`, companionKey)
    // eslint-ignore next-line @typescript-eslint/no-var-requires
    // eslint-disable-next-line ts/no-var-requires
    const Readable = require('node:stream').Readable

    const s = new Readable()
    s.push(response)
    s.push(null)
    if (response !== undefined && response.length > 1) {
      memoryManager.writeToHistory(`${response.trim()}`, companionKey)

      await prisma.companion.update({
        where: {
          id,
        },
        data: {
          companionMessages: {
            create: {
              content: response.trim(),
              role: 'System',
              userId: user.id,
            },
          },
        },
      })
    }

    return new StreamingTextResponse(s)
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
