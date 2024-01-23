export default defineEventHandler(async () => {
  try {
    const categories = await prisma.category.findMany()
    return categories
  }
  catch {
    return createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
