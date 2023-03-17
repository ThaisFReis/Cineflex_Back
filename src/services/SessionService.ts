import { Session } from '@prisma/client'
import SessionRepository from '../repositories/SessionRepository'
import { HttpException } from '../utils/HttpException'

async function createSession(data: Session): Promise<Session> {
    const Session = await SessionRepository.createSession(data)
    return Session;
}

async function getSessionById(id: number): Promise<Session> {
    const Session = await SessionRepository.getSessionById(id)
    if (!Session) {
        throw new HttpException(404, 'Session not found');
    }

    return Session;
}

async function getAllSessions(): Promise<Session[]> {
    const sessions = await SessionRepository.getAllSessions()
    return sessions;
}

async function updateSession(id: number, data: Session): Promise<Session> {
    const Session = await SessionRepository.updateSession(id, data)
    if (!Session) {
        throw new HttpException(404, 'Session not found');
    }

    return Session;
}

async function deleteSession(id: number): Promise<Session> {
    const Session = await SessionRepository.deleteSession(id)
    if (!Session) {
        throw new HttpException(404, 'Session not found'); 
    }

    return Session;
}

const SessionService = {
    createSession,
    getSessionById,
    getAllSessions,
    updateSession,
    deleteSession
}

export default SessionService;