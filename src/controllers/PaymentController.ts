import { Request, Response } from 'express';
import PaymentService from '../services/PaymentService';

async function createPayment(req: Request, res: Response) {
    try {
        const payment = await PaymentService.createPayment(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getPaymentById(req: Request, res: Response) {
   const id = Number(req.params.id);
    try {
        const payment = await PaymentService.getPaymentById(id);
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllPayments(req: Request, res: Response) {
    try {
        const payments = await PaymentService.getAllPayments();
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updatePayment(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        const payment = await PaymentService.updatePayment(id, req.body);
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deletePayment(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
        const payment = await PaymentService.deletePayment(id);
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const PaymentController = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment
}

export default PaymentController;