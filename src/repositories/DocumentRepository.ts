import { Document } from '@prisma/client';
import { prisma } from '../config';

async function create(data: Document) {
  return prisma.document.create({
    data,
  });
}

async function getDocumentById(id: number) {
  return prisma.document.findUnique({
    where: {
      id,
    },
  });
}

async function updateDocumentById(id: number, data: Document) {
    return prisma.document.update({
        where: {
        id,
        },
        data,
    });
}

async function deleteDocumentById(id: number) {
    return prisma.document.delete({
        where: {
        id,
        },
    });
}

const DocumentRepository = {
    create,
    getDocumentById,
    updateDocumentById,
    deleteDocumentById,
};

export default DocumentRepository;