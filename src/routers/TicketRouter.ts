import { Router } from 'express';
import TicketController from '../controllers/TicketController';
import TicketMiddlewares from '../middlewares/TicketMiddlewares';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const ticketRouter = Router();

ticketRouter
    .all('*', AuthMiddleware.authenticateToken, AuthMiddleware.isExpired)
    .post('/create', TicketController.createTicket)
    .get('/:id', TicketMiddlewares.validateTicketExists, TicketController.getTicketById)
    .put('/:id', TicketMiddlewares.validateTicketExists, TicketController.updateTicket)
    .delete('/:id', TicketMiddlewares.validateTicketExists, TicketController.deleteTicket);

export { ticketRouter };