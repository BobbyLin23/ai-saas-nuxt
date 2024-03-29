import type { EventHandlerRequest, H3Event } from 'h3'
import { getServerSession } from '#auth'

export async function getUser(event: H3Event<EventHandlerRequest>) {
  try {
    const session = await getServerSession(event)

    if (!session?.user?.email) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    return user
  }
  catch (error) {
    console.error(error, 'getUser')
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error from getUser',
    })
  }
}
