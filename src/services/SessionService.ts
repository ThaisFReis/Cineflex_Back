import { session } from '@prisma/client'
import SessionRepository from '../repositories/SessionRepository'
import { HttpException } from '../utils/HttpException'

async function createSession(data: session): Promise<session> {
    const session = await SessionRepository.createSession(data)
    return session;
}

async function getSessionById(id: number): Promise<session> {
    const session = await SessionRepository.getSessionById(id)
    if (!session) {
        throw new HttpException(404, 'Session not found');
    }

    return session;
}

async function getAllSessions(): Promise<session[]> {
    const sessions = await SessionRepository.getAllSessions()
    return sessions;
}

async function updateSession(id: number, data: session): Promise<session> {
    const session = await SessionRepository.updateSession(id, data)
    if (!session) {
        throw new HttpException(404, 'Session not found');
    }

    return session;
}

async function deleteSession(id: number): Promise<session> {
    const session = await SessionRepository.deleteSession(id)
    if (!session) {
        throw new HttpException(404, 'Session not found'); 
    }

    return session;
}

const SessionService = {
    createSession,
    getSessionById,
    getAllSessions,
    updateSession,
    deleteSession
}

export default SessionService;