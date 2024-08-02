import { createUser } from '../models/user'

export default defineEventHandler(async () => {
  try {
    const user = await createUser()
    return { user }
  } catch (error) {
    console.log('error111', error)
  }
})
