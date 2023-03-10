import { seat } from '@prisma/client'
import SeatRepository from '../repositories/SeatRepository'
import { HttpException } from '../utils/HttpException'

async function createSeat(data: seat): Promise<seat> {
    const seat = await SeatRepository.createSeat(data)
    return seat;
}

async function getSeatById(id: number): Promise<seat> {
    const seat = await SeatRepository.getSeatById(id)
    if (!seat) {
        throw new HttpException(404, 'Seat not found');
    }

    return seat;
}

async function getAllSeats(): Promise<seat[]> {
    const seats = await SeatRepository.getAllSeats()
    return seats;
}

async function updateSeat(id: number, data: seat): Promise<seat> {
    const seat = await SeatRepository.updateSeat(id, data)
    if (!seat) {
        throw new HttpException(404, 'Seat not found');
    }

    return seat;
}

async function deleteSeat(id: number): Promise<seat> {
    const seat = await SeatRepository.deleteSeat(id)
    if (!seat) {
        throw new HttpException(404, 'Seat not found'); 
    }

    return seat;
}

const SeatService = {
    createSeat,
    getSeatById,
    getAllSeats,
    updateSeat,
    deleteSeat
}

export default SeatService;