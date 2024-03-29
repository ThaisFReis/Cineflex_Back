import { Movie } from '@prisma/client'
import MovieRepository from '../repositories/MovieRepository'
import { HttpException } from '../utils/HttpException'

async function createMovie(Movie: Movie) {
    const movieExists = await MovieRepository.getMovieById(Movie.id)
    if (!movieExists) {
        return await MovieRepository.createMovie(Movie);
    }

    throw new HttpException(409, 'Movie already exists');
}

async function getMovieById(id: number) {
    const Movie = await MovieRepository.getMovieById(id)
    if (!Movie) {
        throw new HttpException(404, 'Movie not found');
    }

    return Movie;
}

async function getAllMovies() {
    const Movies = await MovieRepository.getAllMovies()
    
    if (!Movies) {
        throw new HttpException(404, 'Movies not found');
    }

    return Movies;
}

async function updateMovie(id: number, Movie: Movie) {
    const movieExists = await MovieRepository.getMovieById(id)
    if (!movieExists) {
        throw new HttpException(404, 'Movie not found');
    }

    return await MovieRepository.updateMovie(id, Movie);
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