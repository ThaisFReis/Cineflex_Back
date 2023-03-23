import { PrismaClient, Movie } from '@prisma/client';
const prisma = new PrismaClient()

async function createMovie(movie: Movie) {
    return await prisma.movie.create({
        data: movie,
    })
}

async function getMovieById(id: number) {
    return await prisma.movie.findUnique({
        where: {
            id: id,
        },
    })
}

async function getAllMovies() {
    return await prisma.movie.findMany()
}

async function updateMovie(id: number, movie: Movie) {
    return await prisma.movie.update({
        where: {
            id,
        },
        data: movie,
    })
}

async function deleteMovie(id: number) {
    return await prisma.movie.delete({
        where: {
            id,
        },
    })
}

const MovieRepository = {
    createMovie,
    getMovieById,
    getAllMovies,
    updateMovie,
    deleteMovie,
}

export default MovieRepository;