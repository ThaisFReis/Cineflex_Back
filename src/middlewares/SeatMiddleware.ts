import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import SeatRepository from '../repositories/SeatRepository';
import { createSeatSchema, updateSeatSchema } from '../schemas/SeatSchema';

async function validateCreateSeat(req: Request, res: Response, next: NextFunction) {
    try {
        const { sessionid, rowseats, columnseats, status, seatid } = req.body;
        await createSeatSchema.validateAsync({ sessionid, rowseats, columnseats, status, seatid });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateUpdateSeat(req: Request, res: Response, next: NextFunction) {
    try {
        const { sessionid, rowseats, columnseats, status, seatid } = req.body;
        await updateSeatSchema.validateAsync({ sessionid, rowseats, columnseats, status, seatid });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateSeatExists(req: Request, res: Response, next: NextFunction) {
    try {
        const seat = await SeatRepository.getSeatById(Number(req.params.id));
        if (!seat) {
            throw new HttpException(404, 'Seat not found');
        }

        next();
    } catch (error) {
        next(error);
    }
}

const SeatMiddleware = {
    validateCreateSeat,
    validateUpdateSeat,
    validateSeatExists
};

export default SeatMiddleware;