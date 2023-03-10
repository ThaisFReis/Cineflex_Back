import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import SessionRepository from '../repositories/SessionRepository';
import { createSessionSchema, updateSessionSchema } from '../schemas/SessionSchema';

async function validateCreateSession(req: Request, res: Response, next: NextFunction) {
    try {
        const { movieid, roomid, date } = req.body;
        await createSessionSchema.validateAsync({ movieid, roomid, date });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateUpdateSession(req: Request, res: Response, next: NextFunction) {
    try {
        const { movieid, roomid, date } = req.body;
        await updateSessionSchema.validateAsync({ movieid, roomid, date });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateSessionExists(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await SessionRepository.getSessionById(Number(req.params.id));
        if (!session) {
            throw new HttpException(404, 'Session not found');
        }

        next();
    } catch (error) {
        next(error);
    }
}

const SessionMiddleware = {
    validateCreateSession,
    validateUpdateSession,
    validateSessionExists
};

export default SessionMiddleware;