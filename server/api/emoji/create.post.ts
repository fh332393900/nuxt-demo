import authMiddleware from '~/server/utils/auth'
import prisma from '~/server/models/client'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const user = event.context.user
  const { data } = await readBody(event)
  const newEmoji = await prisma.userEmoji.create({
    data: {
      userId: user.id,
      data
    }
  })
  return {
    status: 'success',
    message: 'Emoji saved successfully',
    data: newEmoji
  }
})
