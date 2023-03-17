import { prisma } from "../config";
import { Payment } from '@prisma/client';

async function createPayment(data: Payment){
    return await prisma.payment.create({
        data
    });
}

async function getPayment(id: number){
    return await prisma.payment.findUnique({
        where: {
            id
        }
    });
}

async function getPayments(){
    return await prisma.payment.findMany();
}

async function updatePayment(id: number, data: Payment){
    return await prisma.payment.update({
        where: {
            id
        },
        data
    });
}

async function deletePayment(id: number){
    return await prisma.payment.delete({
        where: {
            id
        }
    });
}

const PaymentRepository = {
    createPayment,
    getPayment,
    getPayments,
    updatePayment,
    deletePayment
}

export default PaymentRepository;