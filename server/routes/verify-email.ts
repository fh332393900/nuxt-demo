import jwt from 'jsonwebtoken'
import kv from '../utils/kv'
import prisma from '../models/client'

export default defineEventHandler(async (event: any) => {
  const { token }: { token: string } = getQuery(event)
  const secret = process.env.NUXT_SESSION_PASSWORD || ''

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
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password, // 记得对密码进行加密处理
      registrationMethod: 'EMAIL',
      verified: true
    }
  })

  await kv.del(`registration:${token}`)
  console.log(user, '---------')

  // eslint-disable-next-line import/no-named-as-default-member
  const userToken = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' })

  setCookie(event, 'auth._token.local', userToken, {
    httpOnly: false,
    sameSite: true,
    maxAge: 3600
  })
  setCookie(event, 'auth.user.local', JSON.stringify(user), {
    httpOnly: false,
    sameSite: true,
    maxAge: 3600
  })

  return sendRedirect(event, '/')
})
