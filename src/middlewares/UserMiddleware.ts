import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import { createUserSchema, updateUserSchema, loginSchema } from '../schemas/UserSchema';

async function validateCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
        await createUserSchema.validateAsync(req.body);
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateLogin(req: Request, res: Response, next: NextFunction) {

    try {
        await loginSchema.validateAsync(req.body);
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateUpdateUser(req: Request, res: Response, next: NextFunction) {
    try {
        await updateUserSchema.validateAsync(req.body);
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

const UserMiddleware = {
    validateCreateUser,
    validateUpdateUser,
    validateLogin
};

export default UserMiddleware;