import { Document } from '@prisma/client'
import DocumentRepository from '../repositories/DocumentRepository'

async function createDocument(document: Document) {
    return await DocumentRepository.createDocument(document);
    }

async function getDocumentById(id: number) {
    return await DocumentRepository.getDocumentById(id);
}

async function getAllDocuments() {
    return await DocumentRepository.getAllDocuments();
}

async function updateDocument(id: number, document: Document) {
    return await DocumentRepository.updateDocument(id, document);
}

async function deleteDocument(id: number) {
    return await DocumentRepository.deleteDocument(id);
}

const DocumentService = {
    createDocument,
    getDocumentById,
    getAllDocuments,
    updateDocument,
    deleteDocument
}

export default DocumentService;