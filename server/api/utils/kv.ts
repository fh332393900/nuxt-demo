import { createClient } from '@vercel/kv'

console.log(process.env, 'env')
const KV_REST_API_URL = process.env.KV_REST_API_URL || ''
const KV_REST_API_TOKEN = process.env.KV_REST_API_TOKEN || ''
/** kv 数据库 */
const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN
})

export default kv
