import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userRouter = Router();

userRouter
    .post('/signup', UserMiddleware.validateCreateUser, UserController.createUser)
    .get('/', UserController.getUsers)
    .all('*', AuthMiddleware.authenticateToken, AuthMiddleware.isExpired)
    .put('/:id', UserMiddleware.validateUpdateUser, UserController.updateUser)
    .delete('/:id', UserController.deleteUser);

export { userRouter};