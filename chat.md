Chat, este é o meu código (irei dividir em 2 partes, pois o código é muito grande):
# Parte 1:

## schema.prisma:
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @id @default(autoincrement())
  name     String? @db.VarChar(255)
  email    String? @unique @db.VarChar(255)
  password String? @db.VarChar(255)
  sale     sale[]
}

## useRouter.ts:
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

## UserController.ts:
import { Request, Response } from 'express';
import UserService from '../services/UserService';

async function createUser(req: Request, res: Response) {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await UserService.authenticateUser(email, password);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function updateUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserService.updateUser(userId, req.body);
    res.status(200).send(user);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}

async function deleteUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await UserService.deleteUser(userId);
    res.status(200).send(user);
  }
  catch (error) {
    res.status(400).send(error.message);
  }
}


const UserController = {
  createUser,
  login,
  updateUser,
  deleteUser
};

export default UserController;

## UserMiddleware.ts:
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../utils/HttpException';
import UserRepository from '../repositories/UserRepository';
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

# Parte 2:
## UserService.ts:
import { User } from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from '../repositories/UserRepository'
import { HttpException } from '../utils/HttpException'


async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function validateEmail(user: User) {
  const email = user.email;
  if (email === undefined || email === null) {
    throw new HttpException(400, 'Email is required');
  }

  const userExists = await UserRepository.getUserByEmail(email);
  if (userExists) {
    throw new HttpException(400, 'Email already exists');
  }

  return true; // Retorna true para que o usuário possa ser criado
}

async function createUser (user: User) {
  if (!user.password) {
    throw new HttpException(400, 'Password is required');
  }

  await validateEmail(user);

  const hashedPassword = await hashPassword(user.password);
  user.password = hashedPassword;

  return await UserRepository.createUser(user);
}

async function authenticateUser(email, password) {
  const user = await UserRepository.getUserByEmail(email);
  if (!user) {
    throw new Error('User not found.');
  }

  if(!user.password) {
    throw new Error('Password not found.');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password.');
  }

  if(!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found.');
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });

  return { user, token };
}


async function updateUser(id: number, user: User) {
  if (user.email) {
    await validateEmail(user);
  }

  if (user.password) {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
  }

  return await UserRepository.updateUser(id, user);
}

async function deleteUser(id: number) {
  return await UserRepository.deleteUser(id);
}

export default {
  createUser,
  authenticateUser,
  updateUser,
  deleteUser
}

## UserRepository.ts:
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient()

async function createUser(user: User) {
  return await prisma.user.create({
    data: user,
  })
}

async function getUserByEmail(email: string ) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  })
}

async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  })
}

async function updateUser(id: number, user: User) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user, 
  })
}

async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },  
  })
}

const UserRepository = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  deleteUser,
}

export default UserRepository;

## UserSchema.ts:
import Joi from 'joi';

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const updateUserSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export { createUserSchema, updateUserSchema, loginSchema };