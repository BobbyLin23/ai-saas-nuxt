export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, 'id')

    const conversation = await prisma.companion.findUnique({
      where: {
        id,
      },
      include: {
        companionMessages: true,
      },
    })

    return conversation
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
