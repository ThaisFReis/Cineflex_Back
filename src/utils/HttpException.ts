// Este arquivo é um utilitário para lidar com exceções HTTP. Ele define uma classe HttpException que pode ser usada para lançar exceções HTTP com um código de status e uma mensagem de erro. O utilitário também define uma função errorHandler que pode ser usada como um middleware de tratamento de erros para lidar com exceções lançadas pelo new HttpException.

import { Response } from 'express';

export class HttpException extends Error {
    status: number; // Código de status HTTP
    message: string; // Mensagem de erro personalizada
    
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
    
  /**
   * Escreve o erro na resposta HTTP como JSON.
   * @param res A resposta HTTP a ser escrita.
   */

  sendResponse(res: Response) {
    const error = {
        status: this.status,
        message: this.message,
    }

    res.status(this.status).json(error);

    }
}