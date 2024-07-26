import kv from './utils/kv'

export default defineEventHandler(async () => {
  const views = await kv.get('views')
  await kv.set('views', views)

  return views
})
