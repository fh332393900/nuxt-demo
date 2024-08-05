import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { LoginTypes } from './type'
import prisma from '@/server/models/client'

const secret = process.env.NUXT_SESSION_PASSWORD || ''

export default defineEventHandler(async (event: any) => {
  const { email, password }: LoginTypes = await readBody(event)

  const user = await prisma.user.findUnique({
    where: { email }
  })
  console.log(user, '9999999')
  if (!user) {
    return {
      status: 'error',
      message: 'Invalid email'
    }
  }

  const isPasswordValid = await bcrypt.compare(password, user.password as string)

  if (!isPasswordValid) {
    return {
      status: 'error',
      message: 'Invalid password'
    }
  }

  // eslint-disable-next-line import/no-named-as-default-member
  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' })

  setCookie(event, 'auth._token.local', token, {
    httpOnly: true,
    sameSite: true,
    maxAge: 3600
  })

  return {
    status: 'success',
    token,
    user
  }
})
