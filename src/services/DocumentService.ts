import { Document } from '@prisma/client'
import DocumentRepository from '../repositories/DocumentRepository'
import { HttpException } from '../utils/HttpException'

async function create(data: Document) {
    return DocumentRepository.create(data)
}

async function getDocumentById(id: number) {
    const document = await DocumentRepository.getDocumentById(id)
    if (!document) {
        throw new HttpException(404, 'Document not found')
    }
    return document
}

async function updateDocumentById(id: number, data: Document) {
    const document = await DocumentRepository.getDocumentById(id)
    if (!document) {
        throw new HttpException(404, 'Document not found')
    }
    return DocumentRepository.updateDocumentById(id, data)
}   

async function deleteDocumentById(id: number) {
    const document = await DocumentRepository.getDocumentById(id)
    if (!document) {
        throw new HttpException(404, 'Document not found')
    }
    return DocumentRepository.deleteDocumentById(id)
}

const DocumentService = {
    create,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById,
}