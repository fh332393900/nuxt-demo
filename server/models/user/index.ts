import prisma from '../client'

export const createUser = async (data: any) => {
  return await prisma.user.create({
    data
  })
}
