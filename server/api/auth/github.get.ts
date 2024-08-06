import jwt from 'jsonwebtoken'
import { setUserCookie } from '../../utils/setUser'
import prisma from '~/server/models/client'

async function getUserByEmail (email: string) {
  const user = await prisma.user.findUnique({
    where: { email }
  })
  return user
}
// 已注册的用户，github自动关联
async function updateGithubUser (userId: string, user: any) {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl: user.avatar_url,
      githubId: `${user.id}`
    }
  })
}

async function createGithubUser (user: any) {
  return await prisma.user.create({
    data: {
      email: user.email,
      username: user.name,
      password: '',
      registrationMethod: 'GITHUB',
      verified: true,
      avatarUrl: user.avatar_url,
      githubId: `${user.id}`
    }
  })
}

export default oauth.githubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess (event, { user }) {
    user.name = user.login
    user.avatar = user.avatar_url
    console.log(user, '----user')
    await setUserSession(event, { user })
    const appUser = await getUserByEmail(user.email)
    const secret = process.env.NUXT_SESSION_PASSWORD || ''
    if (appUser) {
      const token = jwt.sign({ id: appUser.id, email: appUser.email }, secret, { expiresIn: '1h' })

      if (!appUser.githubId) {
        const updateUser = await updateGithubUser(appUser.id, user)
        setUserCookie(event, token, updateUser)
      } else {
        setUserCookie(event, token, appUser)
      }
    } else {
      const createUser = await createGithubUser(user)
      const token = jwt.sign({ id: createUser.id, email: createUser.email }, secret, { expiresIn: '1h' })
      setUserCookie(event, token, createUser)
    }
    return sendRedirect(event, '/')
  },
  // Optional, will return a json error and 401 status code by default
  onError (event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  }
})
