export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const conversation = await prisma.conversation.findUnique({
      where: {
        id,
      },
      include: {
        messages: true,
      },
    })

    return conversation
  }
  catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
