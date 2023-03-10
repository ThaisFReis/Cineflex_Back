import { sale } from '@prisma/client'
import SaleRepository from '../repositories/SaleRepository'
import { HttpException } from '../utils/HttpException'

async function createSale(data: sale): Promise<sale> {
    const sale = await SaleRepository.createSale(data)
    return sale;
}

async function getSaleById(id: number): Promise<sale> {
    const sale = await SaleRepository.getSaleById(id)
    if (!sale) {
        throw new HttpException(404, 'Sale not found');
    }

    return sale;
}

async function getAllSales(): Promise<sale[]> {
    const sales = await SaleRepository.getAllSales()
    return sales;
}

async function updateSale(id: number, data: sale): Promise<sale> {
    const sale = await SaleRepository.updateSale(id, data)
    if (!sale) {
        throw new HttpException(404, 'Sale not found');
    }

    return sale;
}

async function deleteSale(id: number): Promise<sale> {
    const sale = await SaleRepository.deleteSale(id)
    if (!sale) {
        throw new HttpException(404, 'Sale not found'); 
    }

    return sale;
}

const SaleService = {
    createSale,
    getSaleById,
    getAllSales,
    updateSale,
    deleteSale
}

export default SaleService;