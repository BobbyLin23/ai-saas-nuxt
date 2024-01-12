export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { conversationId, name } = body

    if (!conversationId || !name) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Conversation id and name are required',
      })
    }

    const conversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        name,
      },
    })

    return conversation
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
