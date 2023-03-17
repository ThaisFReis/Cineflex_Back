import { Payment } from '@prisma/client'
import PaymentRepository from '../repositories/PaymentRepository'
import { HttpException } from '../utils/HttpException'

async function createPayment(data: Payment): Promise<Payment> {
    const payment = await PaymentRepository.createPayment(data)
    return payment;
}

async function getPaymentById(id: number): Promise<Payment> {
    const payment = await PaymentRepository.getPayment(id)
    if (!payment) {
        throw new HttpException(404, 'Payment not found');
    }

    return payment;
}

async function getAllPayments(): Promise<Payment[]> {
    const payments = await PaymentRepository.getPayments()
    return payments;
}

async function updatePayment(id: number, data: Payment): Promise<Payment> {
    const payment = await PaymentRepository.updatePayment(id, data)
    if (!payment) {
        throw new HttpException(404, 'Payment not found');
    }

    return payment;
}

async function deletePayment(id: number): Promise<Payment> {
    const payment = await PaymentRepository.deletePayment(id)
    if (!payment) {
        throw new HttpException(404, 'Payment not found'); 
    }

    return payment;
}

const PaymentService = {
    createPayment,
    getPaymentById,
    getAllPayments,
    updatePayment,
    deletePayment
}

export default PaymentService;