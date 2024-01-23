export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const user = await getUser(event)

    if (!user || !user.id) {
      return createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      })
    }

    const { src, name, description, instructions, seed, categoryId } = body

    if (!src || !name || !description || !instructions || !seed || !categoryId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All fields are required',
      })
    }

    const companion = await prisma.companion.create({
      data: {
        categoryId,
        userId: user.id,
        src,
        name,
        description,
        instructions,
        seed,
      },
    })

    return companion
  }
  catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
