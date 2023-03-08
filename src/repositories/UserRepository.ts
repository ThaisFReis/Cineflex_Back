import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient()

async function createUser(user: User) {
  return await prisma.user.create({
    data: user,
  })
}

async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

async function updateUser(id: number, user: User) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user, 
  })
}

async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },  
  })
}

const UserRepository = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
}

export default UserRepository;