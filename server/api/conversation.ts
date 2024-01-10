import process from 'node:process'
import type { ChatCompletion } from 'openai/src/resources/chat/completions'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { messages } = body

    if (!messages) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Message is required',
      })
    }

    const conversation = await $fetch<ChatCompletion>('https://api.openai-sb.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_SB_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        stream: false,
        messages,
      }),
      timeout: 100000,
    })

    return conversation.choices[0].message
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
