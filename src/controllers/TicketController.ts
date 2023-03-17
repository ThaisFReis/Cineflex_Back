import { Request, Response } from 'express';
import TicketService from '../services/TicketService';

async function createTicket(req: Request, res: Response) {
    const { userId } = req.params
    const { ticket, document } = req.body

    const createdTicket = await TicketService.createTicket(Number(userId), ticket, document)
    return res.status(201).json(createdTicket)
}

async function getTicketById(req: Request, res: Response) {
    const { id } = req.params

    const ticket = await TicketService.getTicketById(Number(id))
    return res.status(200).json(ticket)
}

async function updateTicket(req: Request, res: Response) {
    const { id } = req.params
    const { ticket } = req.body

    const updatedTicket = await TicketService.updateTicket(Number(id), ticket)
    return res.status(200).json(updatedTicket)
}

async function deleteTicket(req: Request, res: Response) {
    const { id } = req.params

    const deletedTicket = await TicketService.deleteTicket(Number(id))
    return res.status(200).json(deletedTicket)
}

const TicketController = {
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket,
}

export default TicketController;