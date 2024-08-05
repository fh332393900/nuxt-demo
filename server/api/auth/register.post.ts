import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import kv from '../utils/kv'
import prisma from '../../models/client'
import { sendVerificationEmail } from '../utils/sendEmail'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (user) {
    return {
      status: 'error',
      message: 'Already has this email'
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerificationToken = uuidv4() // 生成唯一的验证令牌
  // 存储临时数据到 Vercel KV
  await kv.set(`registration:${emailVerificationToken}`, JSON.stringify({
    email,
    username: email,
    password: hashedPassword
  }))
  console.log('kv success1')
  await kv.expire(`registration:${emailVerificationToken}`, 3600)
  console.log('kv success2')
  await sendVerificationEmail(email, emailVerificationToken)

  return {
    status: 'success',
    message: 'Verification email sent'
  }
})
