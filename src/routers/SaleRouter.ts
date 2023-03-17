import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import SaleMiddleware from '../middlewares/SaleMiddleware';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const saleRouter = Router();

saleRouter
    .get('/', SaleController.getAllSales)
    .all('*', AuthMiddleware.authenticateToken, AuthMiddleware.isExpired)
    .post('/create', SaleMiddleware.validateCreateSale, SaleController.createSale, SaleMiddleware.validateTypeTicket, SaleMiddleware.validateTypeMeia)
    .get('/:id', SaleMiddleware.validateSaleExists, SaleController.getSaleById)
    .put('/:id', SaleMiddleware.validateSaleExists, SaleMiddleware.validateUpdateSale, SaleController.updateSale)
    .delete('/:id', SaleMiddleware.validateSaleExists, SaleController.deleteSale);

export { saleRouter };