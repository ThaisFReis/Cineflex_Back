import { Router } from 'express';
import SaleController from '../controllers/SaleController';
import SaleMiddleware from '../middlewares/SaleMiddleware';

const saleRouter = Router();

saleRouter
    .post('/create', SaleMiddleware.validateCreateSale, SaleController.createSale, SaleMiddleware.validateTypeTicket, SaleMiddleware.validateTypeMeia)
    .get('/:id', SaleMiddleware.validateSaleExists, SaleController.getSaleById)
    .get('/', SaleController.getAllSales)
    .put('/:id', SaleMiddleware.validateSaleExists, SaleMiddleware.validateUpdateSale, SaleController.updateSale)
    .delete('/:id', SaleMiddleware.validateSaleExists, SaleController.deleteSale);

export { saleRouter };