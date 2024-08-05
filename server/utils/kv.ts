import { createClient } from '@vercel/kv'

const config = useRuntimeConfig()
/** kv 数据库 */
const kv = createClient({
  url: config.kvApi,
  token: config.kvToken
})

export default kv
