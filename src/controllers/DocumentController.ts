import { Request, Response } from 'express';
import DocumentRepository from '../repositories/DocumentRepository';

/*
model Document {
  id       Int          @id @default(autoincrement())
  type     DocumentType // cpf ou rg
  number   String
  verified Boolean      @default(false)
  user     User         @relation(fields: [userId], references: [id])
  userId   Int
}

enum DocumentType {
  CPF
  RG
}
*/