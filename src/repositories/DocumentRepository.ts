import { PrismaClient, Document } from '@prisma/client';
const prisma = new PrismaClient()

async function createDocument(data: Document): Promise<Document> {
    const document = await prisma.document.create({
        data: data
    })

    return document;
}

async function getDocumentById(id: number): Promise<Document> {
    const document = await prisma.document.findUnique({
        where: {
            id: id
        }
    })

    return document;
}

async function getAllDocuments(): Promise<Document[]> {
    const documents = await prisma.document.findMany()

    return documents;
}

async function updateDocument(id: number, data: Document): Promise<Document> {
    const document = await prisma.document.update({
        where: {
            id: id
        },
        data: data
    })

    return document;
}

async function deleteDocument(id: number): Promise<Document> {
    const document = await prisma.document.delete({
        where: {
            id: id
        }
    })

    return document;
}

const DocumentRepository = {
    createDocument,
    getDocumentById,
    getAllDocuments,    
    updateDocument,
    deleteDocument
}

export default DocumentRepository;