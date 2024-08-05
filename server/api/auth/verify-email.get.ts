import kv from '../utils/kv'
import prisma from '../../models/client'

export default defineEventHandler(async (event) => {
  const { token }: { token: string } = getQuery(event)

  // 获取临时数据
  const tempData = await kv.get(`registration:${token}`)
  console.log(tempData)
  if (!tempData) {
    return {
      status: 'error',
      message: 'Invalid or expired verification token'
    }
  }

  const { email, username, password } = tempData

  // 创建用户
  await prisma.user.create({
    data: {
      email,
      username,
      password, // 记得对密码进行加密处理
      registrationMethod: 'EMAIL',
      verified: true
    }
  })

  await kv.delete(`registration:${token}`)

  return {
    status: 'success',
    message: 'Email verified successfully'
  }
})
