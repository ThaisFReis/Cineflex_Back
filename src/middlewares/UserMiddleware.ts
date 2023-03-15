import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../utils/HttpException';
import UserRepository from '../repositories/UserRepository';
import { createUserSchema, updateUserSchema, loginSchema } from '../schemas/UserSchema';

async function validateCreateUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password } = req.body;
        await createUserSchema.validateAsync(req.body);
        const user = await UserRepository.getUserByEmail(email);
        if (user) {
            next(new HttpException(400, 'User already exists'));
        }
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