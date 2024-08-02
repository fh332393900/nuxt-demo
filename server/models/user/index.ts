import prisma from '../client'

export const createUser = async () => {
  return await prisma.user.create({
    data: {
      username: 'newuser123',
      email: 'test11111@qq.com',
      password: '123456', // 应用程序应负责密码哈希
      registrationMethod: 'EMAIL',
      avatarUrl: '',
      gender: '',
      phoneNumber: '19900883321'
    }
  })
}
