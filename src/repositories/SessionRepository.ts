import { PrismaClient, Session } from '@prisma/client';
const prisma = new PrismaClient()

async function createSession(data: Session): Promise<Session> {
    const session = await prisma.session.create({
        data: data
    })

    return session;
}

async function getSessionById(id: number): Promise<Session> {
    const session = await prisma.session.findUnique({
        where: {
            id: id
        }
    })

    return session;
}

async function getAllSessions(): Promise<Session[]> {
    const sessions = await prisma.session.findMany()

    return sessions;
}

async function updateSession(id: number, data: Session): Promise<Session> {
    const session = await prisma.session.update({
        where: {
            id: id
        },
        data: data
    })

    return session;
}

async function deleteSession(id: number): Promise<Session> {
    const session = await prisma.session.delete({
        where: {
            id: id
        }
    })

    return session;
}

const SessionRepository = {
    createSession,
    getSessionById,
    getAllSessions,
    updateSession,
    deleteSession
}

export default SessionRepository;