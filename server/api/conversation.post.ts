import { getUser } from '../utils/getUser'

export default defineEventHandler(async (event) => {
  try {
    const user = await getUser(event)

    if (!user?.id) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const conversation = await prisma.conversation.create({
      data: {
        name: 'New Chat',
        userId: user?.id,
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
