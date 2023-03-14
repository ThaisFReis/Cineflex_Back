// Este arquivo contém a lógica de negócios relacionada aos usuários. Ele define as funções para criar, ler, atualizar e excluir usuários, fazendo uso do new UserRepository para interagir com o banco de dados. O userService também pode validar dados de entrada, como a senha do usuário e o formato do email, antes de passar esses dados para o new UserRepository.


import { User } from '@prisma/client'
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import UserRepository from '../repositories/UserRepository'
import { HttpException } from '../utils/HttpException'


async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validateEmail(user: User) {
  const email = user.email;
  if (email === undefined || email === null) {
    throw new HttpException(400, 'Email is required');
  }

  const userExists = await UserRepository.getUserByEmail(email);
  if (userExists) {
    throw new HttpException(400, 'Email already exists');
  }

  return true; // Retorna true para que o usuário possa ser criado
}

async function createUser (user: User) {
  if (!user.password) {
    throw new HttpException(400, 'Password is required');
  }

  await validateEmail(user);

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return await UserRepository.createUser(user);
}

async function authenticateUser(email, password) {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found.');
  }

  if(!user.password) {
    throw new Error('Password not found.');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password.');
  }

  if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found.');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return { user, token };
}


async function updateUser(id: number, user: User) {
  if (user.email) {
    await validateEmail(user);
  }

  if (user.password) {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  }

  return await UserRepository.updateUser(id, user);
}

async function deleteUser(id: number) {
  return await UserRepository.deleteUser(id);
}

async function getUsers() {
  return await UserRepository.getUsers();
}

export default {
  createUser,
  authenticateUser,
  updateUser,
  deleteUser,
  getUsers
}