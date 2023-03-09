import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';

const userRouter = Router();

userRouter
    .post('/signup', UserMiddleware.validateCreateUser, UserController.createUser)
    .post('/login', UserMiddleware.validateLogin, UserController.login, UserMiddleware.validateToken)
    .put('/:id', UserMiddleware.validateUpdateUser, UserController.updateUser)
    .delete('/:id', UserController.deleteUser, UserMiddleware.validateToken);

export { userRouter};