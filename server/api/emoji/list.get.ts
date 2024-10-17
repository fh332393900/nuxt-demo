import authMiddleware from '~/server/utils/auth'
import prisma from '~/server/models/client'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  const user = event.context.user
  const userId = user.id
  if (!userId) {
    return {
      status: 'error',
      message: 'User ID is required'
    }
  }

  try {
    // 查询用户的表情及其用户信息
    const emojis = await prisma.userEmoji.findMany({
      where: {
        userId
      },
      include: {
        user: true // 通过 include 加载关联的用户信息
      }
    })

    if (emojis.length === 0) {
      return {
        success: false,
        message: 'No emojis found for this user'
      }
    }

    return {
      status: 'success',
      data: emojis
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'Error fetching user emojis',
      error
    }
  }
})
