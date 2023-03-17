import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import DocumentRepository from '../repositories/DocumentRepository';
import {  RGSchema, CPFSchema  } from '../schemas/DocumentSchema';

async function validateCreateDocument(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.body.type == "RG") {
            await RGSchema.validateAsync(req.body);
        } else if (req.body.type == "CPF") {
            await CPFSchema.validateAsync(req.body);
        }
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateUpdateDocument(req: Request, res: Response, next: NextFunction) {
    try {
        if (req.body.type == "RG") {
            await RGSchema.validateAsync(req.body);
        } else if (req.body.type == "CPF") {
            await CPFSchema.validateAsync(req.body);
        }
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateDocumentExists(req: Request, res: Response, next: NextFunction) {
    try {
        const documentId: number = parseInt(req.params.id);
        const document = await DocumentRepository.getDocumentById(documentId);
        if (!document) {
            next(new HttpException(404, 'Document not found'));
        }
        req.body.document = document;
        next();
    } catch (error) {
        next(new HttpException(500, 'Internal server error'));
    }
}

const DocumentMiddleware = {
    validateCreateDocument,
    validateUpdateDocument,
    validateDocumentExists,
};

export default DocumentMiddleware;