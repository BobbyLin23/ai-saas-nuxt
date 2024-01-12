export default defineEventHandler(async (evnet) => {
  try {
    const id = getRouterParam(evnet, 'id')
    const conversation = await prisma.conversation.delete({
      where: {
        id,
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
