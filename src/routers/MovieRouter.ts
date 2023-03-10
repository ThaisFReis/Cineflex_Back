import { Router } from 'express';
import MovieController from '../controllers/MovieController';
import MovieMiddleware from '../middlewares/MovieMiddleware';

const movieRouter = Router();

movieRouter
    .post('/create', MovieMiddleware.validateCreateMovie, MovieController.createMovie)
    .get('/', MovieController.getAllMovies)
    .get('/:id', MovieMiddleware.validateMovieExists, MovieController.getMovieById)
    .put('/:id', MovieMiddleware.validateMovieExists, MovieMiddleware.validateUpdateMovie, MovieController.updateMovie)
    .delete('/:id', MovieMiddleware.validateMovieExists, MovieController.deleteMovie);

export { movieRouter };