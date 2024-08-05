import kv from '@/server/utils/kv'

export default defineEventHandler(async () => {
  const views: number = await kv.get('views') || 0
  await kv.set('views', views + 1)

  return views
})
