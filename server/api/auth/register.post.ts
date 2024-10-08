import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import kv from '@/server/utils/kv'
import prisma from '@/server/models/client'
import { sendVerificationEmail } from '@/server/utils/sendEmail'

export default defineEventHandler(async (event: any) => {
  const { email, username, password } = await readBody(event)
  const t = await useTranslation(event)

  const user = await prisma.user.findUnique({
    where: { email }
  })
  if (user) {
    return {
      status: 'error',
      message: t('server.email_exists')
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerificationToken = uuidv4() // 生成唯一的验证令牌
  // 存储临时数据到 Vercel KV
  await kv.set(`registration:${emailVerificationToken}`, JSON.stringify({
    email,
    username,
    password: hashedPassword
  }))
  await kv.expire(`registration:${emailVerificationToken}`, 3600)
  await sendVerificationEmail(email, emailVerificationToken)

  return {
    status: 'success',
    message: 'Verification email sent'
  }
})
