import { Seat } from '@prisma/client'
import SeatRepository from '../repositories/SeatRepository'
import { HttpException } from '../utils/HttpException'

async function createSeat(data: Seat): Promise<Seat> {
    const Seat = await SeatRepository.createSeat(data)
    return Seat;
}

async function getSeatById(id: number): Promise<Seat> {
    const Seat = await SeatRepository.getSeatById(id)
    if (!Seat) {
        throw new HttpException(404, 'Seat not found');
    }

    return Seat;
}

async function getAllSeats(): Promise<Seat[]> {
    const seats = await SeatRepository.getAllSeats()
    return seats;
}

async function updateSeat(id: number, data: Seat): Promise<Seat> {
    const Seat = await SeatRepository.updateSeat(id, data)
    if (!Seat) {
        throw new HttpException(404, 'Seat not found');
    }

    return Seat;
}

async function deleteSeat(id: number): Promise<Seat> {
    const Seat = await SeatRepository.deleteSeat(id)
    if (!Seat) {
        throw new HttpException(404, 'Seat not found'); 
    }

    return Seat;
}

const SeatService = {
    createSeat,
    getSeatById,
    getAllSeats,
    updateSeat,
    deleteSeat
}

export default SeatService;