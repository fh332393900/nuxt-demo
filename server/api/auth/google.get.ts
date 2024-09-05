import jwt from 'jsonwebtoken'
import { setUserCookie } from '../../utils/setUser'
import prisma from '~/server/models/client'

async function getUserByEmail (email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  return user
}

// 已注册的用户，google自动关联
async function updateGoogleUser (userId: string, user: any) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl: user.picture,
      googleId: `${user.sub}`
    }
  })
}

async function createGoogleUser (user: any) {
  return await prisma.user.create({
    data: {
      email: user.email,
      username: user.name,
      password: '',
      registrationMethod: 'GOOGLE',
      verified: true,
      avatarUrl: user.picture,
      googleId: `${user.sub}`
    }
  })
}

export default oauth.googleEventHandler({
  async onSuccess (event, { user }) {
    user.avatar = user.picture
    console.log(user, '----user')
    const secret = process.env.NUXT_SESSION_PASSWORD || ''
    const appUser = await getUserByEmail(user.email)
    if (appUser) {
      const token = jwt.sign({ id: appUser.id, email: appUser.email }, secret, { expiresIn: '1h' })

      if (!appUser.googleId) {
        const updateUser = await updateGoogleUser(appUser.id, user)
        setUserCookie(event, token, updateUser)
      } else {
        setUserCookie(event, token, appUser)
      }
    } else {
      const createUser = await createGoogleUser(user)
      const token = jwt.sign({ id: createUser.id, email: createUser.email }, secret, { expiresIn: '1h' })
      setUserCookie(event, token, createUser)
    }
    await setUserSession(event, { user })
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('Google OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
