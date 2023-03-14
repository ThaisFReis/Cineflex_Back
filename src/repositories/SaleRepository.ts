import { PrismaClient, Sale } from '@prisma/client';
const prisma = new PrismaClient()

async function createSale(data: Sale): Promise<Sale> {
    const sale = await prisma.sale.create({
        data: data
    })

    return sale;
}

async function getSaleById(id: number): Promise<Sale> {
    const sale = await prisma.sale.findUnique({
        where: {
            id: id
        }
    })

    return sale;
}

async function getAllSales(): Promise<Sale[]> {
    const sales = await prisma.sale.findMany()

    return sales;
}

async function updateSale(id: number, data: Sale): Promise<Sale> {
    const sale = await prisma.sale.update({
        where: {
            id: id
        },
        data: data
    })

    return sale;
}

async function deleteSale(id: number): Promise<Sale> {
    const sale = await prisma.sale.delete({
        where: {
            id: id
        }
    })

    return sale;
}

const SaleRepository = {
    createSale,
    getSaleById,
    getAllSales,
    updateSale,
    deleteSale
}

export default SaleRepository;