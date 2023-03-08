// Este arquivo contém a lógica de negócios relacionada aos usuários. Ele define as funções para criar, ler, atualizar e excluir usuários, fazendo uso do new UserRepository para interagir com o banco de dados. O userService também pode validar dados de entrada, como a senha do usuário e o formato do email, antes de passar esses dados para o new UserRepository.


import { User } from '@prisma/client'
import UserRepository from '../repositories/UserRepository'
import { createUserSchema } from '../schema/UserSchema'
import bcrypt from "bcrypt";

export async function createUser({id, name, email, password}: User) {
  await createUserSchema.validateAsync({ name, email, password });

  await validateEmail(email);

  const hashedPassword = await bcrypt.hash(password, 10);

  return UserRepository.createUser({
    id,
    name,
    email,
    password: hashedPassword,
  });
}

export async function validateEmail(email: string | undefined | null) {
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await UserRepository.getUserByEmail(email);

  if (user) {
    throw new Error("Email already in use");
  }
}

export async function getUserById(id: number) {
  const user = await UserRepository.getUserById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

export async function updateUser(id: number, user: User) {
  const updatedUser = await UserRepository.updateUser(id, user);

  return updatedUser;
}

export async function deleteUser(id: number) {
  const deletedUser = await UserRepository.deleteUser(id);

  return deletedUser;
}

const UserService = {
  createUser,
  validateEmail,
  getUserById,
  updateUser,
  deleteUser,
};

export default UserService;