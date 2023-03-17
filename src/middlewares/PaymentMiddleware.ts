import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import PaymentRepository from '../repositories/PaymentRepository';

async function validatePaymentExists(req: Request, res: Response, next: NextFunction) {
    try {
        const paymentId: number = parseInt(req.params.id);
        const payment = await PaymentRepository.getPayment(paymentId);
        if (!payment) {
            next(new HttpException(404, 'Payment not found'));
        }
        req.body.payment = payment;
        next();
    } catch (error) {
        next(new HttpException(500, 'Internal server error'));
    }
}

const PaymentMiddleware = {
    validatePaymentExists,
};

export default PaymentMiddleware;    