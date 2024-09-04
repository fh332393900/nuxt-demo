import prisma from '~/server/models/client'
import authMiddleware from '~/server/utils/auth'

export default defineEventHandler(async (event: any) => {
  await authMiddleware(event)
  const user = event.context.user
  const { username, avatarUrl } = await readBody(event)
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      avatarUrl,
      username
    }
  })
  setCookie(event, 'auth.user.local', JSON.stringify(updateUser), {
    httpOnly: false,
    sameSite: true,
    maxAge: 3600
  })
  return {
    status: 'success',
    user: updateUser
  }
})
