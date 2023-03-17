import { Ticket } from '@prisma/client';
import { prisma } from '../config';

async function create (ticket: Ticket) {
  return await prisma.ticket.create({ data: ticket });
}

async function findAll () {
    return await prisma.ticket.findMany();
}

async function findTicketById (id: number){
    return await prisma.ticket.findUnique({ where: { id } });
}

async function updateTicket (id: number, ticket: Ticket) {
    return await prisma.ticket.update({ where: { id }, data: ticket });
}

async function deleteTicket (id: number) {
    return await prisma.ticket.delete({ where: { id } });
}

async function ticketType (type: boolean) {
    return await prisma.ticket.findMany({ where: { type } });
}

const TicketRepository = {
    create,
    findAll,
    findTicketById,
    updateTicket,
    deleteTicket,
    ticketType
}

export default TicketRepository;