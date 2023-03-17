import { Sale } from '@prisma/client'
import SaleRepository from '../repositories/SaleRepository'
import { HttpException } from '../utils/HttpException'

async function createSale(data: Sale): Promise<Sale> {
    const Sale = await SaleRepository.createSale(data)
    return Sale;
}

async function getSaleById(id: number): Promise<Sale> {
    const Sale = await SaleRepository.getSaleById(id)
    if (!Sale) {
        throw new HttpException(404, 'Sale not found');
    }

    return Sale;
}

async function getAllSales(): Promise<Sale[]> {
    const sales = await SaleRepository.getAllSales()
    return sales;
}

async function updateSale(id: number, data: Sale): Promise<Sale> {
    const Sale = await SaleRepository.updateSale(id, data)
    if (!Sale) {
        throw new HttpException(404, 'Sale not found');
    }

    return Sale;
}

async function deleteSale(id: number): Promise<Sale> {
    const Sale = await SaleRepository.deleteSale(id)
    if (!Sale) {
        throw new HttpException(404, 'Sale not found'); 
    }

    return Sale;
}

const SaleService = {
    createSale,
    getSaleById,
    getAllSales,
    updateSale,
    deleteSale
}

export default SaleService;