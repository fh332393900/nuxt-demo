import * as nodemailer from 'nodemailer'

export async function sendVerificationEmail (email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'fh332393900@gmail.com',
      clientId:
      process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET,
      refreshToken:
        '1//0443FWyR2xpT-CgYIARAAGAQSNwF-L9IrW8Ine0KHFGRaaLM0tZAkx-1zYqYcqWpfrS-1NX23Gm5_hQTtSeflPtULwJ5gwkERCWI',
      accessToken:
        'ya29.a0AcM612zLCRHR14bZTRB4RfzlrXYFpg9SG59KXAAwJzvvkFOowt7Ksk2ySPfupdWaqOzo9eUw-ChkrA4v1gJvxqwctSk46Eanq4jm2QgPiDJs7OIENO3gSwHC6L2V98s6EvkSMS7rhnw6iyqgXn0qXhZ_gELm9qRvM0xyaCgYKAagSARASFQHGX2MiWxup6hsm7OKGTtx9s7DQHA0171'
    }
  })

  const verificationLink = `http://localhost:3000/api/auth/verify-email?token=${token}`

  const mailOptions = {
    from: 'fh332393900@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking on the following link: ${verificationLink}`
  }

  await transporter.sendMail(mailOptions)
}
