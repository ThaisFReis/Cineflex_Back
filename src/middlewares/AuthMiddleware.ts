import { Request, Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";
import { prisma } from "../config";
import { HttpException } from '../utils/HttpException';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
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


export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};