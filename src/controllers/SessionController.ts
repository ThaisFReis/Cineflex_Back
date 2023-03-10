import { Request, Response } from 'express';
import SessionService from '../services/SessionService';

async function createSession(req: Request, res: Response) {
    const session = req.body;
    const createdSession = await SessionService.createSession(session);
    res.status(201).send(createdSession);
}

async function getSessionById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const session = await SessionService.getSessionById(id);
    res.status(200).send(session);
}

async function getAllSessions(req: Request, res: Response) {
    const sessions = await SessionService.getAllSessions();
    res.status(200).send(sessions);
}

async function updateSession(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const session = req.body;
    const updatedSession = await SessionService.updateSession(id, session);
    res.status(200).send(updatedSession);
}

async function deleteSession(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await SessionService.deleteSession(id);
    res.status(200).send();
}

const SessionController = {
    createSession,
    getSessionById,
    getAllSessions,
    updateSession,
    deleteSession,
};

export default SessionController;