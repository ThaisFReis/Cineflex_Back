import { PrismaClient, Ticket } from '@prisma/client';
const prisma = new PrismaClient()

async function createTicket(data: Ticket): Promise<Ticket> {
    const ticket = await prisma.ticket.create({
        data: data
    })

    return ticket;
}

async function getTicketById(id: number): Promise<Ticket> {
    const ticket = await prisma.ticket.findUnique({
        where: {
            id: id
        }
    })

    return ticket;
}

async function getAllTickets(): Promise<Ticket[]> {
    const tickets = await prisma.ticket.findMany()

    return tickets;
}

async function updateTicket(id: number, data: Ticket): Promise<Ticket> {
    const ticket = await prisma.ticket.update({
        where: {
            id: id
        },
        data: data
    })

    return ticket;
}

async function deleteTicket(id: number): Promise<Ticket> {
    const ticket = await prisma.ticket.delete({
        where: {
            id: id
        }
    })

    return ticket;
}

const TicketRepository = {
    createTicket,
    getTicketById,
    getAllTickets,
    updateTicket,
    deleteTicket
}

export default TicketRepository;