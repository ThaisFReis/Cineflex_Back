import { Ticket, Document } from '@prisma/client'
import TicketRepository from '../repositories/TicketRepository'
import DocumentRepository from '../repositories/DocumentRepository'
import UserRepository from '../repositories/UserRepository'
import { RGSchema, CPFSchema } from '../schemas/DocumentSchema'

/*
odel Ticket {
  id         Int       @id @default(autoincrement())
  type       Boolean   @default(false) //False == inteira, True == Meia
  session    Session   @relation(fields: [sessionId], references: [id])
  sessionId  Int
  seat       Seat[]
  saleId     Int?
  createAt   DateTime
  userId     Int
  user       User      @relation(fields: [userId], references: [id])
  documentId Int?
  document   Document? @relation(fields: [documentId], references: [id])
}

model Document {
  id       Int          @id @default(autoincrement())
  type     DocumentType // cpf ou rg
  number   String
  verified Boolean      @default(false)
  user     User         @relation(fields: [userId], references: [id])
  userId   Int
  ticket   Ticket[]
}

enum DocumentType {
  CPF
  RG
}
*/

async function createTicket(userId: number, ticket: Ticket, document: Document) {
    const user = await UserRepository.getUserById(userId)
    if (!user) {
        throw new Error('User not found')
    }

    // If type of ticket is true, then it is a request for a new document
    if (ticket.type === true) {
        if (document.type === 'RG') {
            const { error } = RGSchema.validate(document)
            if (error) {
                throw new Error(error.message)
            }

            const createdDocument = await DocumentRepository.create(document)
            return createdDocument
        }

        if (document.type === 'CPF') {
            const { error } = CPFSchema.validate(document)
            if (error) {
                throw new Error(error.message)
            }

            const createdDocument = await DocumentRepository.create(document)
            return createdDocument
        }
    }

    const createdTicket = await TicketRepository.create(ticket)
    return createdTicket

}

async function getTicketById(id: number) {
    const ticket = await TicketRepository.findTicketById(id)
    if (!ticket) {
        throw new Error('Ticket not found')
    }
    return ticket
}

async function updateTicket(id: number, ticket: Ticket) {
    const ticketToUpdate = await TicketRepository.findTicketById(id)
    if (!ticketToUpdate) {
        throw new Error('Ticket not found')
    }

    const updatedTicket = await TicketRepository.updateTicket(id, ticket)
    return updatedTicket
}

async function deleteTicket(id: number) {
    const ticketToDelete = await TicketRepository.findTicketById(id)
    if (!ticketToDelete) {
        throw new Error('Ticket not found')
    }

    const deletedTicket = await TicketRepository.deleteTicket(id)
    return deletedTicket
}

const TicketService = {
    createTicket,
    getTicketById,
    updateTicket,
    deleteTicket,
}

export default TicketService;