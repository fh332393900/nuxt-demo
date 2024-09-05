import prisma from '~/server/models/client'
import authMiddleware from '~/server/utils/auth'

export default defineEventHandler(async (event: any) => {
  await authMiddleware(event)
  const user = event.context.user
  await prisma.user.delete({
    where: { id: user.id }
  })
  setCookie(event, 'auth.user.local', '')
  return {
    status: 'success'
  }
})
