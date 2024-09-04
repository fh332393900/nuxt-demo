import authMiddleware from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  await authMiddleware(event)
  return {
    status: 'success',
    data: {
      url: process.env.NUXT_SUPABASE_URL,
      bucket: 'https://gmpherjortzssdpmpxkp.supabase.co/storage/v1/object/public/',
      key: process.env.NUXT_SUPABASE_KEY
    }
  }
})
