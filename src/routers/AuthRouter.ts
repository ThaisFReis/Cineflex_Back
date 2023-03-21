import { signIn }from '../controllers/AuthController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import { validateBody } from "../middlewares/ValidationMiddleware";
import { loginSchema } from '../schemas/UserSchema';
import { Router } from 'express';

const authRouter = Router();

authRouter
    .post('/login', validateBody(loginSchema), signIn, AuthMiddleware.authenticateToken, AuthMiddleware.verifyEmailAndPassword);

export { authRouter };