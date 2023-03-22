// Este arquivo contém a lógica de negócios relacionada aos usuários. Ele define as funções para criar, ler, atualizar e excluir usuários, fazendo uso do new UserRepository para interagir com o banco de dados. O userService também pode validar dados de entrada, como a senha do usuário e o formato do email, antes de passar esses dados para o new UserRepository.

import { User } from '@prisma/client'
import * as bcrypt from "bcrypt";
import UserRepository from '../repositories/UserRepository'
import { HttpException } from '../utils/HttpException'
import { duplicatedEmailError } from "../utils/errors";

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validateEmail(user: User) {
  const email = user.email;
  if (email === undefined || email === null) {
    throw new HttpException(400, 'Email is required');
  }

  // Use regex to validate email format
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(email)) {
    throw new HttpException(400, 'Email is invalid');
  }

  const userExists = await UserRepository.getUserByEmail(email);
  if (userExists) {
    throw duplicatedEmailError();
  }

  return true; // Retorna true para que o usuário possa ser criado
}

async function createUser (user: User) {
  if (!user.name) {
    throw new HttpException(400, '"name" is required');
  }

  if (!user.password) {
    throw new HttpException(400, '"password" is required');
  }

  if (user.password.length < 6) {
    throw new HttpException(400, 'Password must be at least 6 characters');
  }

  await validateEmail(user);

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return await UserRepository.createUser(user);
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

async function getUserById(id: number) {
  return await UserRepository.getUserById(id);
}

export default {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUserById
}