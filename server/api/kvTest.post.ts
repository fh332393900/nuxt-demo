import kv from './utils/kv'

export default defineEventHandler(async () => {
  await kv.set('test', 'mytest')
  await kv.expire('test', 60)

  return kv.get('test')
})
