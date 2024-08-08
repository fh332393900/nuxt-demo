import * as nodemailer from 'nodemailer'

export async function sendVerificationEmail (email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '332393900@qq.com',
      pass: process.env.QQ_EMAIL_PASS || ''
    }
  })

  const verificationLink = `${process.env.AUTH_ORIGIN}/verify-email?token=${token}`

  const mailOptions = {
    from: '332393900@qq.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`
  }

  await transporter.sendMail(mailOptions)
}
