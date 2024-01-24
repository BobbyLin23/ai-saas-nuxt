export default defineEventHandler(async (event) => {
  try {
    const user = await getUser(event)

    if (!user || !user.id) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const companions = await prisma.companion.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return companions
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
