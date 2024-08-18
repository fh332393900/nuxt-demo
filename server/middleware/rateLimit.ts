import kv from '@/server/utils/kv'

const RATE_LIMIT_WINDOW = 60 // 时间窗口，单位为秒
const MAX_REQUESTS = 5 // 在时间窗口内允许的最大请求数

export default defineEventHandler(async (event) => {
  const ip = event.req.headers['x-forwarded-for'] || event.req.socket.remoteAddress
  const key = `rate-limit:${ip}`

  // 获取当前请求计数
  const current = await kv.incr(key)

  if (current === 1) {
    // 如果是第一次请求，设置键的过期时间
    await kv.expire(key, RATE_LIMIT_WINDOW)
  }

  if (current > MAX_REQUESTS) {
    // 如果超过了最大请求数，返回 429 状态码
    return sendError(event, createError({ statusCode: 429, statusMessage: 'Too Many Requests' }))
  }
})
