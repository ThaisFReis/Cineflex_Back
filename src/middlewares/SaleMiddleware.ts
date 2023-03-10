import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import SaleRepository from '../repositories/SaleRepository';
import { createSaleSchema, updateSaleSchema } from '../schemas/SaleSchema';

async function validateTypeTicket(req: Request, res: Response, next: NextFunction) {
    try {
        const { type } = req.body;
        if (type != "inteiros" && type != "meia") {
            throw new HttpException(400, 'Type ticket invalid');
        }
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateTypeMeia (req: Request, res: Response, next: NextFunction) {
    try {
        const { type, documenttype, documentnumber } = req.body;
        if (type == "meia") {
            // O usuario precisa escolher cpf ou rg para comprovar que é estudante
            if (documenttype != "cpf" && documenttype != "rg") {
                throw new HttpException(400, 'Document type invalid');
            }

            // Se o usuario escolher cpf, ele precisa digitar um cpf valido
            if (documenttype == "cpf") {
                // regex para validar cpf
                const regex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
                if (!regex.test(documentnumber)) {
                    throw new HttpException(400, 'Document number invalid');
                }
            }

            // Se o usuario escolher rg, ele precisa digitar um rg valido
            if (documenttype == "rg") {
                // regex para validar rg
                const regex = /^\d{2}\.\d{3}\.\d{3}\-\d{1}$/;
                if (!regex.test(documentnumber)) {
                    throw new HttpException(400, 'Document number invalid');
                }
            }
        }
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateCreateSale(req: Request, res: Response, next: NextFunction) {
    try {
        const { userid, movieid, date } = req.body;
        await createSaleSchema.validateAsync({ userid, movieid, date });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}


async function validateUpdateSale(req: Request, res: Response, next: NextFunction) {
    try {
        const { userid, movieid, date } = req.body;
        await updateSaleSchema.validateAsync({ userid, movieid, date });
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateSaleExists(req: Request, res: Response, next: NextFunction) {
    try {
        const sale = await SaleRepository.getSaleById(Number(req.params.id));
        if (!sale) {
            throw new HttpException(404, 'Sale not found');
        }

        next();
    } catch (error) {
        next(error);
    }
}

const SaleMiddleware = {
    validateTypeTicket,
    validateTypeMeia,
    validateCreateSale,
    validateUpdateSale,
    validateSaleExists
};

export default SaleMiddleware;