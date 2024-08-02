import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { addHours } from 'date-fns'
import prisma from '../../models/client'
import { sendVerificationEmail } from '../utils/sendEmail'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const hashedPassword = await bcrypt.hash(password, 10)
  const emailVerificationToken = uuidv4() // 生成唯一的验证令牌
  const emailVerificationExpires = addHours(new Date(), 24) // 设置24小时过期时间

  const user = await prisma.user.create({
    data: {
      username: email,
      email,
      registrationMethod: 'EMAIL',
      password: hashedPassword,
      emailVerificationToken,
      emailVerificationExpires
    }
  })

  await sendVerificationEmail(email, emailVerificationToken)

  return {
    status: 'success',
    user
  }
})
