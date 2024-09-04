import { defineEventHandler, H3Event, createError } from 'h3'
import jwt from 'jsonwebtoken'

// 你可以把密钥放在环境变量中
const JWT_SECRET = process.env.NUXT_SESSION_PASSWORD || ''

export default defineEventHandler((event: H3Event) => {
  const authHeader = event.req.headers.authorization || ''
  const token = authHeader.split(' ')[1] || getCookie(event, 'auth._token.local') || ''

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Authorization header missing' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    // 将解码后的用户信息附加到请求中
    event.context.user = decoded
  } catch (error) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }
})
