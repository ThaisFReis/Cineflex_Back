// Este arquivo é responsável por definir as rotas e os controladores para lidar com as requisições HTTP. Ele utiliza o userService para executar as ações necessárias, como criar um novo usuário ou buscar um usuário existente, e retorna as respostas adequadas ao cliente em formato JSON. O userController também pode lidar com a validação de entrada e autenticação do usuário antes de passar os dados para o userService.

import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      return res.json(user);
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserService.updateUser(Number(req.params.id), req.body);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const result = await UserService.deleteUser(Number(req.params.id));
      return res.json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}