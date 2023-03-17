import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import TicketRepository from '../repositories/TicketRepository';

async function validateTicketExists(req: Request, res: Response, next: NextFunction) {
    try {
        const ticketId: number = parseInt(req.params.id);
        const ticket = await TicketRepository.findTicketById(ticketId);
        if (!ticket) {
            next(new HttpException(404, 'Ticket not found'));
        }
        req.body.ticket = ticket;
        next();
    } catch (error) {
        next(new HttpException(500, 'Internal server error'));
    }
}

const TicketMiddlewares = {
    validateTicketExists,
}

export default TicketMiddlewares;