/*
schema.prisma:
model Movie {
  id       Int       @id @default(autoincrement())
  title    String
  poster   String?
  sessions Session[]
}
*/

/*
MovieSchema.ts:
import Joi from "joi";

const createMovieSchema = Joi.object({
    title: Joi.string().required(),
    poster: Joi.string().required()
});

const updateMovieSchema = Joi.object({
    title: Joi.string(),
    poster: Joi.string()
});

export { createMovieSchema, updateMovieSchema };
*/

/*
MovieFactory.ts:
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
*/

import supertest from 'supertest';
import app, { init } from "../../src/app";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createMovie } from "../factories";
import { cleanDatabase } from "../utils/helpers";

beforeAll(async () => {
    await init();
    await cleanDatabase();
});

const server = supertest(app);

describe("Movies", () => {
    describe("POST /movies/create", () => {
        it("should respond with status 400 when body is not given", async () => {
            const response = await server.post("/movies/create");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await server.post("/movies/create").send(invalidBody);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    });

    describe("when body is valid", () => {
        it("should respond with status 201 and create movie when given title is unique", async () => {
            const validBody = await createMovie({
              title: faker.name.fullName(),
              poster: faker.image.imageUrl(),
            });

            const movie = await prisma.movie.findFirst({
                where: { title: validBody.title },
            });

            if (!movie) {
                const response = await server.post("/movies/create").send(validBody);
                expect(response.status).toBe(httpStatus.CREATED);
                expect(response.body).toEqual({
                id: expect.any(Number),
                title: validBody.title,
                poster: validBody.poster,
                });
            }
        });
    
        it("should save movie on db", async () => {
            const validBody = await createMovie({
                title: faker.name.fullName(),
                poster: faker.image.imageUrl(),
              });
    
            const response = await server.post("/movies/create").send(validBody);
    
            const movie = await prisma.movie.findFirst({
                where: { title: response.body.title },
            });
    
            expect(movie).not.toBeNull();
    
        });
    
        it("should respond with status 400 and not create movie when given title is not unique", async () => {
            const validBody = await createMovie({
                title: faker.name.fullName(),
                poster: faker.image.imageUrl(),
              });
            
            const response = await server.post("/movies/create").send(validBody);
    
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    });

    describe("GET /movies", () => {
        it("should respond with status 200 and return all movies", async () => {
            const response = await server.get("/movies");

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual(expect.any(Array));
        });

        it("should respond with empty array when there are no movies", async () => {
            await cleanDatabase();

            const response = await server.get("/movies");

            expect(response.body).toEqual([]);
        });
    });

    describe("GET /movies/:id", () => {
        it("should respond with status 200 and return movie when given id is valid", async () => {
            // Get movie from db
            const movie = await prisma.movie.findFirst({});

            if (movie) {
                const response = await server.get(`/movies/${movie.id}`);

                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toEqual({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster,
                });
            }
        
        });

        it("should respond with status 400 when given id is invalid", async () => {
            await cleanDatabase();

            const response = await server.get("/movies/1");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    });

    describe("PUT /movies/:id", () => {
        it("should respond with status 400 when body is not given", async () => {
            const response = await server.put("/movies/1");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

            const response = await server.put("/movies/1").send(invalidBody);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when given id is invalid", async () => {
            await cleanDatabase();

            const response = await server.put("/movies/1");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 200 and update movie when given id is valid", async () => {
            const movie = await prisma.movie.findFirst({});

            if (movie) {
                const validBody = await createMovie({
                    title: faker.name.fullName(),
                    poster: faker.image.imageUrl(),
                });

                const response = await server.put(`/movies/${movie.id}`).send(validBody);

                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toEqual({
                    id: movie.id,
                    title: validBody.title,
                    poster: validBody.poster,
                });
            }
        });
    });

    describe("DELETE /movies/:id", () => {
        it("should respond with status 400 when given id is invalid", async () => {
            await cleanDatabase();

            const response = await server.delete("/movies/1");

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 200 and delete movie when given id is valid", async () => {
            const movie = await prisma.movie.findFirst({});

            if (movie) {
                const response = await server.delete(`/movies/${movie.id}`);

                expect(response.status).toBe(httpStatus.OK);
                expect(response.body).toEqual({
                    id: movie.id,
                    title: movie.title,
                    poster: movie.poster,
                });
            }
        });
    });
});