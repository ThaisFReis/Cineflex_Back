import { Router } from 'express';
import SeatController from '../controllers/SeatController';
import SeatMiddleware from '../middlewares/SeatMiddleware';

const seatRouter = Router();

seatRouter
    .post('/create', SeatMiddleware.validateCreateSeat, SeatController.createSeat)
    .get('/:id', SeatMiddleware.validateSeatExists, SeatController.getSeatById)
    .get('/', SeatController.getAllSeats)
    .put('/:id', SeatMiddleware.validateSeatExists, SeatMiddleware.validateUpdateSeat, SeatController.updateSeat)
    .delete('/:id', SeatMiddleware.validateSeatExists, SeatController.deleteSeat);    

export { seatRouter };