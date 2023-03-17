import { Router } from 'express';
import PaymentController from '../controllers/PaymentController';
import PaymentMiddleware from '../middlewares/PaymentMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const paymentRouter = Router();

paymentRouter
    .get('/', PaymentController.getAllPayments)
    .all('*', AuthMiddleware.authenticateToken, AuthMiddleware.isExpired)
    .get('/:id', PaymentMiddleware.validatePaymentExists, PaymentController.createPayment)
    .put('/:id', PaymentMiddleware.validatePaymentExists, PaymentController.updatePayment)
    .delete('/:id', PaymentMiddleware.validatePaymentExists, PaymentController.deletePayment);

export { paymentRouter };