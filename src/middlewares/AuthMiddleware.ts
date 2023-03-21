import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { prisma } from "../config";
import { HttpException } from '../utils/HttpException';
import bcrypt from "bcrypt";

async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new HttpException(401, "No token provided");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new HttpException(401, "No token provided");
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    const userSession = await prisma.token.findFirst({
      where: {
        token
      }
    });

    if (!userSession) {
      throw new HttpException(401, "Invalid token");
    }

    req.userId = userId;
    next();
  } catch (error) {
    throw new HttpException(401, "Invalid token");
  }
}

async function isExpired(token: string) {
  const { exp } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
  const userSession = await prisma.token.findFirst({
    where: {
      token
    }
  });

  if (!userSession) {
    throw new HttpException(401, "Invalid token");
  }

  const now = new Date().getTime() / 1000;
  const isExpired = now > exp;

  if (!isExpired) {
    return false;
  }

  await prisma.token.delete({
    where: {
      token
    }
  });

  return true;

}

async function verifyEmailAndPassword(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  if (email ===  "" || email === undefined || password === "" || password === undefined) {
    throw new HttpException(404, "Email and password are required");
  }

  next();
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
  exp: number;
};

const AuthMiddleware = {
  authenticateToken,
  isExpired,
  verifyEmailAndPassword
};

export default AuthMiddleware;