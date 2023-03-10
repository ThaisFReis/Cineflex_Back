import { Router } from 'express';
import SessionController from '../controllers/SessionController';
import SessionMiddleware from '../middlewares/SessionMiddleware';

const sessionRouter = Router();

sessionRouter
    .post('/create', SessionMiddleware.validateCreateSession, SessionController.createSession)
    .get('/:id', SessionMiddleware.validateSessionExists, SessionController.getSessionById)
    .get('/', SessionController.getAllSessions)
    .put('/:id', SessionMiddleware.validateSessionExists, SessionMiddleware.validateUpdateSession, SessionController.updateSession)
    .delete('/:id', SessionMiddleware.validateSessionExists, SessionController.deleteSession);

export { sessionRouter };