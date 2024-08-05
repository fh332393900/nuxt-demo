import * as nodemailer from 'nodemailer'

export async function sendVerificationEmail (email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 发送方邮箱 qq 通过lib/wel-konw
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '332393900@qq.com', // 发送方邮箱地址
      pass: process.env.QQ_EMAIL_PASS || '' // mtp 验证码 这个有了才可以发送邮件，可以qq邮箱去查看自己的码
    }
  })

  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`

  const mailOptions = {
    from: '332393900@qq.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`
  }

  await transporter.sendMail(mailOptions)
}
