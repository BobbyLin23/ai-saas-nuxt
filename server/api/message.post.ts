export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    const { content, conversationId, role } = body

    if (!content || !conversationId || !role) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Content and conversation id are required',
      })
    }

    const message = await prisma.message.create({
      data: {
        content,
        role,
        conversationId,
      },
    })

    return message
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
