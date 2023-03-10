import { Request, Response } from 'express';
import SaleService from '../services/SaleService';

async function createSale(req: Request, res: Response) {
    const sale = req.body;
    const createdSale = await SaleService.createSale(sale);
    res.status(201).send(createdSale);
}

async function getSaleById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const sale = await SaleService.getSaleById(id);
    res.status(200).send(sale);
}

async function getAllSales(req: Request, res: Response) {
    const sales = await SaleService.getAllSales();
    res.status(200).send(sales);
}

async function updateSale(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const sale = req.body;
    const updatedSale = await SaleService.updateSale(id, sale);
    res.status(200).send(updatedSale);
}

async function deleteSale(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await SaleService.deleteSale(id);
    res.status(200).send();
}

const SaleController = {
    createSale,
    getSaleById,
    getAllSales,
    updateSale,
    deleteSale,
};

export default SaleController;