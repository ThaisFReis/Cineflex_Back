import { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { cleanDatabase } from "../utils/helpers";
import { createMovieSchema, updateMovieSchema } from '../../src/schemas/MovieSchema';

beforeAll(async () => {
    await init();
    await cleanDatabase();
});

describe('MovieSchema', () => {
    describe('createMovieSchema', () => {
        it('should validate a valid movie', () => {
            const movie = {
                title: faker.name.firstName(),
                poster: faker.image.imageUrl(),
            };
            const { error } = createMovieSchema.validate(movie);
            expect(error).toBeUndefined();
        });
        it('should invalidate a movie without a title', () => {
            const movie = {
                poster: faker.image.imageUrl(),
            };
            const { error } = createMovieSchema.validate(movie);
            expect(error).not.toBeUndefined();
        });
        it('should invalidate a movie without a poster', () => {
            const movie = {
                title: faker.name.firstName(),
            };
            const { error } = createMovieSchema.validate(movie);
            expect(error).not.toBeUndefined();
        });

        it('should invalidate a movie with an invalid poster', () => {
            const movie = {
                title: faker.name.firstName(),
                poster: faker.lorem.word(),
            };
            const { error } = createMovieSchema.validate(movie);
            expect(error).not.toBeUndefined();
        });
    });

    describe('updateMovieSchema', () => {
        it('should validate a valid movie', () => {
            const movie = {
                title: faker.name.firstName(),
                poster: faker.image.imageUrl(),
            };
            const { error } = updateMovieSchema.validate(movie);
            expect(error).toBeUndefined();
        });
        it('should invalidate a movie without a title', () => {
            const movie = {
                poster: faker.image.imageUrl(),
            };
            const { error } = updateMovieSchema.validate(movie);
            expect(error).toBeUndefined();
        });
        it('should invalidate a movie without a poster', () => {
            const movie = {
                title: faker.name.firstName(),
            };
            const { error } = updateMovieSchema.validate(movie);
            expect(error).toBeUndefined();
        });

        it('should invalidate a movie with an invalid poster', () => {
            const movie = {
                title: faker.name.firstName(),
                poster: faker.lorem.word(),
            };
            const { error } = updateMovieSchema.validate(movie);
            expect(error).toBeUndefined();
        });
    });
});