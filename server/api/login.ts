export default defineEventHandler(() => {
  const res = {
    name: 's',
    age: 22
  }
  if (res.age === 22) {
    throw createError({
      statusCode: 23,
      statusMessage: 'errrrrrrrrrrr'
    })
  }
  return res
})
