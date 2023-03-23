import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/HttpException';
import { createMovieSchema, updateMovieSchema } from '../schemas/MovieSchema';

async function validateCreateMovie(req: Request, res: Response, next: NextFunction) {
    try {
        await createMovieSchema.validateAsync(req.body);
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateUpdateMovie(req: Request, res: Response, next: NextFunction) {
    try {
        await updateMovieSchema.validateAsync(req.body);
        next();
    } catch (error) {
        next(new HttpException(400, error.message));
    }
}

async function validateMovieExists(req: Request, res: Response, next: NextFunction) {
    try {
        const movieId: number = parseInt(req.params.id);
        if (isNaN(movieId)) {
            return res.status(400).json({ error: 'Invalid movie id' });
        }
        next();
    } catch (error) {
        next(new HttpException(500, 'Internal server error'));
    }
}

const MovieMiddleware = {
    validateCreateMovie,
    validateUpdateMovie,
    validateMovieExists,
};

export default MovieMiddleware;