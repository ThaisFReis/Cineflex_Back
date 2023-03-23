import { faker } from '@faker-js/faker';
import { Movie } from "@prisma/client";
import { prisma } from "../../src/config";

export async function createMovie(params: Partial<Movie> = {}): Promise<Movie> {
    let movie = await prisma.movie.create({
        data: {
            title: params.title || faker.name.firstName(),
        },
    });

    if (!movie) {
        movie = await prisma.movie.create({
            data: {
                title: params.title || faker.name.firstName(),
                poster: params.poster || faker.image.imageUrl(),
            },
        });
    }

    return movie;
}