import { Router } from 'express';
import MovieController from '../controllers/MovieController';
import MovieMiddleware from '../middlewares/MovieMiddleware';

const movieRouter = Router();

movieRouter
    .post('/create', MovieMiddleware.validateCreateMovie, MovieController.createMovie)
    .get('/', MovieController.getAllMovies)
    .all('*', MovieMiddleware.validateMovieExists)
    .get('/:id', MovieController.getMovieById)
    .put('/:id', MovieMiddleware.validateUpdateMovie, MovieController.updateMovie)
    .delete('/:id', MovieController.deleteMovie);

export { movieRouter };