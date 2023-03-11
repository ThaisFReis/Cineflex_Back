// Este arquivo é responsável por definir as rotas e os controladores para lidar com as requisições HTTP. Ele utiliza o userService para executar as ações necessárias, como criar um novo usuário ou buscar um usuário existente, e retorna as respostas adequadas ao cliente em formato JSON. O userController também pode lidar com a validação de entrada e autenticação do usuário antes de passar os dados para o userService.

import { Request, Response } from 'express';
import UserService from '../services/UserService';

async function getUsers(req: Request, res: Response) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function createUser(req: Request, res: Response) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await UserService.authenticateUser(email, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserService.updateUser(userId, req.body);
    res.status(200).send(user);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserService.deleteUser(userId);
    res.status(200).send(user);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}


const UserController = {
  createUser,
  login,
  updateUser,
  deleteUser,
  getUsers,
};

export default UserController;