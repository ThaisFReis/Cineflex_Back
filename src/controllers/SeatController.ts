import { Request, Response } from 'express';
import SeatService from '../services/SeatService';

async function createSeat(req: Request, res: Response) {
    const seat = req.body;
    const createdSeat = await SeatService.createSeat(seat);
    res.status(201).send(createdSeat);
}

async function getSeatById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const seat = await SeatService.getSeatById(id);
    res.status(200).send(seat);
}

async function getAllSeats(req: Request, res: Response) {
    const seats = await SeatService.getAllSeats();
    res.status(200).send(seats);
}

async function updateSeat(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const seat = req.body;
    const updatedSeat = await SeatService.updateSeat(id, seat);
    res.status(200).send(updatedSeat);
}

async function deleteSeat(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await SeatService.deleteSeat(id);
    res.status(200).send();
}

const SeatController = {
    createSeat,
    getSeatById,
    getAllSeats,
    updateSeat,
    deleteSeat,
};

export default SeatController;