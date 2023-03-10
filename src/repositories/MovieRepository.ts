import { PrismaClient, movie } from '@prisma/client';
const prisma = new PrismaClient()

async function createMovie(movie: movie) {
    return await prisma.movie.create({
        data: movie,
    })
}

async function getMovieById(id: number) {
    return await prisma.movie.findUnique({
        where: {
            id,
        },
    })
}

async function getAllMovies() {
    return await prisma.movie.findMany()
}

async function updateMovie(id: number, movie: movie) {
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