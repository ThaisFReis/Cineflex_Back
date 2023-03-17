import { Router } from 'express';
import DocumentController from '../controllers/DocumentController';
import DocumentMiddleware from '../middlewares/DocumentMiddlewares';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const documentRouter = Router();

documentRouter
    .all('*', AuthMiddleware.authenticateToken, AuthMiddleware.isExpired)
    .post('/create', DocumentMiddleware.validateCreateDocument, DocumentController.create)
    .get('/:id', DocumentMiddleware.validateDocumentExists, DocumentController.getDocumentById)
    .put('/:id', DocumentMiddleware.validateUpdateDocument, DocumentMiddleware.validateDocumentExists, DocumentController.updateDocumentById)
    .delete('/:id', DocumentMiddleware.validateDocumentExists, DocumentController.deleteDocumentById);

export { documentRouter };