import { Request, Response } from 'express';
import MovieService from '../services/MovieService';

async function createMovie(req: Request, res: Response) {
    const movie = req.body;
    const createdMovie = await MovieService.createMovie(movie);
    res.status(201).send(createdMovie);
}

async function getMovieById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const movie = await MovieService.getMovieById(id);
    res.status(200).send(movie);
}

async function getAllMovies(req: Request, res: Response) {
    const movies = await MovieService.getAllMovies();
    res.status(200).send(movies);
}

async function updateMovie(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const movie = req.body;
    const updatedMovie = await MovieService.updateMovie(id, movie);
    res.status(200).send(updatedMovie);
}

async function deleteMovie(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await MovieService.deleteMovie(id);
    res.status(200).send();
}

const MovieController = {
    createMovie,
    getMovieById,
    getAllMovies,
    updateMovie,
    deleteMovie,
};

export default MovieController;