import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter
    .post('/users', userController.createUser)
    .get('/users/:id', userController.getUserById)
    .patch('/users/:id', userController.updateUser)
    .delete('/users/:id', userController.deleteUser);

export { userRouter}