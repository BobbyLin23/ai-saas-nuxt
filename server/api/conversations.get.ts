/**
 * Get Conversations List
 */
export default defineEventHandler(async (event) => {
  try {
    const user = await getUser(event)

    if (!user || !user.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        messages: true,
      },
    })

    return conversations
  }
  catch (e) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
