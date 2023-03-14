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

async function validateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new HttpException(401, 'Unauthorized');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new HttpException(401, 'Unauthorized');
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new HttpException(500, 'Internal server error');
        }

        const decoded = verify(token, secret) as { id: number };

        const user = await UserRepository.getUserById(decoded.id);
        if (!user) {
            next(new HttpException(401, 'Unauthorized'));
        }

        req.body.user = user;

        next();
    } catch (error) {
        next(new HttpException(401, 'Unauthorized'));
    }
}

const UserMiddleware = {
    validateCreateUser,
    validateUpdateUser,
    validateToken,
    validateLogin
};

export default UserMiddleware;