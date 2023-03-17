import { Request, Response } from 'express';
import DocumentRepository from '../repositories/DocumentRepository';

/*
model Document {
  id       Int          @id @default(autoincrement())
  name     String
  type     DocumentType // cpf ou rg
  number   String
  verified Boolean      @default(false)
}

enum DocumentType {
  CPF
  RG
}
*/

async function create(req: Request, res: Response) {
  const { name, type, number, userId } = req.body;
  const document = await DocumentRepository.create({
    name,
    type,
    number,
    userId,
    id: undefined,
  });

  return res.status(201).json(document);
}

async function getDocumentById(req: Request, res: Response) {
  const { id } = req.params;
  const document = await DocumentRepository.getDocumentById(Number(id));

  return res.status(200).json(document);
}

async function updateDocumentById(req: Request, res: Response) {
  const { id } = req.params;
  const { name, type, number, userId } = req.body;
  const document = await DocumentRepository.updateDocumentById(Number(id), {
    name,
    type,
    number,
    userId,
    id: undefined,
  });

  return res.status(200).json(document);
}

async function deleteDocumentById(req: Request, res: Response) {
  const { id } = req.params;
  await DocumentRepository.deleteDocumentById(Number(id));

  return res.status(204).send();
}

const DocumentController = {
  create,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};

export default DocumentController;