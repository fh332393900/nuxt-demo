import kv from '../utils/kv'
import prisma from '../../models/client'

export default defineEventHandler(async (event) => {
  const { token }: { token: string } = getQuery(event)

  // 获取临时数据
  const tempData = await kv.get(`registration:${token}`) as string
  if (!tempData) {
    return {
      status: 'error',
      message: 'Invalid or expired verification token'
    }
  }

  const { email, username, password } = JSON.parse(tempData)

  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: token }
  })

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid verification token'
    })
  }

  // 创建用户
  await prisma.user.create({
    data: {
      email,
      username,
      password, // 记得对密码进行加密处理
      emailVerified: true,
      verificationToken: null,
      verificationExpiry: null
    }
  })

  return {
    status: 'success',
    message: 'Email verified successfully'
  }
})
