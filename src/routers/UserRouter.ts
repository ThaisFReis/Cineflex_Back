import { Router } from 'express';
import UserController from '../controllers/UserController';
import UserMiddleware from '../middlewares/UserMiddleware';
import { authenticateToken } from '../middlewares/AuthMiddleware';

const userRouter = Router();

userRouter
    .post('/signup', UserMiddleware.validateCreateUser, UserController.createUser)
    .put('/:id', UserMiddleware.validateUpdateUser, UserController.updateUser)
    .delete('/:id', UserController.deleteUser, authenticateToken)
    .get('/', UserController.getUsers, authenticateToken);

export { userRouter};