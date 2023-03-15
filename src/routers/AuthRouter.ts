import { signIn }from '../controllers/AuthController';
import { authenticateToken } from '../middlewares/AuthMiddleware';
import { validateBody } from "../middlewares/ValidationMiddleware";
import { loginSchema } from '../schemas/UserSchema';
import { Router } from 'express';

const authRouter = Router();

authRouter
    .post('/login', validateBody(loginSchema), signIn, authenticateToken);

export { authRouter };