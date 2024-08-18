import { H3Event } from 'h3'

// 中间件函数类型
type MiddlewareFunction = (event: H3Event) => Promise<void> | void;

export async function useMiddleware (event: H3Event, middleware: MiddlewareFunction) {
  try {
    // 运行传入的中间件
    await middleware(event)
  } catch (error: any) {
    // 捕获中间件中的错误并返回 HTTP 错误响应
    sendError(event, createError({ statusCode: error.statusCode || 500, statusMessage: error.statusMessage || 'Internal Server Error' }))
  }
}
