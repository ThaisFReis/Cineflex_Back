import { PrismaClient, Seat } from '@prisma/client';
const prisma = new PrismaClient()

async function createSeat(data: Seat): Promise<Seat> {
    const seat = await prisma.seat.create({
        data: data
    })

    return seat;
}

async function getSeatById(id: number): Promise<Seat> {
    const seat = await prisma.seat.findUnique({
        where: {
            id: id
        }
    })

    return seat;
}

async function getAllSeats(): Promise<Seat[]> {
    const seats = await prisma.seat.findMany()

    return seats;
}

async function updateSeat(id: number, data: Seat): Promise<Seat> {
    const seat = await prisma.seat.update({
        where: {
            id: id
        },
        data: data
    })

    return seat;
}

async function deleteSeat(id: number): Promise<Seat> {
    const seat = await prisma.seat.delete({
        where: {
            id: id
        }
    })

    return seat;
}

const SeatRepository = {
    createSeat,
    getSeatById,
    getAllSeats,
    updateSeat,
    deleteSeat
}
  
export default SeatRepository;