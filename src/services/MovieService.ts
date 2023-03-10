import { movie } from '@prisma/client'
import MovieRepository from '../repositories/MovieRepository'
import { HttpException } from '../utils/HttpException'

async function createMovie(movie: movie) {
    const movieExists = await MovieRepository.getMovieById(movie.id)
    if (movieExists) {
        throw new HttpException(400, 'Movie already exists');
    }

    return await MovieRepository.createMovie(movie);
}

async function getMovieById(id: number) {
    const movie = await MovieRepository.getMovieById(id)
    if (!movie) {
        throw new HttpException(404, 'Movie not found');
    }

    return movie;
}

async function getAllMovies() {
    return await MovieRepository.getAllMovies();
}

async function updateMovie(id: number, movie: movie) {
    const movieExists = await MovieRepository.getMovieById(id)
    if (!movieExists) {
        throw new HttpException(404, 'Movie not found');
    }

    return await MovieRepository.updateMovie(id, movie);
}

async function deleteMovie(id: number) {
    const movieExists = await MovieRepository.getMovieById(id)
    if (!movieExists) {
        throw new HttpException(404, 'Movie not found');
    }

    return await MovieRepository.deleteMovie(id);
}

export default {
    createMovie,
    getMovieById,
    getAllMovies,
    updateMovie,
    deleteMovie,
}