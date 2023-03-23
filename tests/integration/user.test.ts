import supertest from 'supertest';
import app, { init } from "../../src/app";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import { createUser } from "../factories";
import { cleanDatabase } from "../utils/helpers";

beforeAll(async () => {
        await init();
        await cleanDatabase();
});

const server = supertest(app);

describe("POST /users/signup", () => {

        it("should respond with status 400 when body is not given", async () => {
                const response = await server.post("/users/signup");

                expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
                const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

                const response = await server.post("/users/signup").send(invalidBody);

                expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        describe("when body is valid", () => {
                const validBody = {
                        name: faker.name.fullName(),
                        email: faker.internet.email(),
                        password: faker.internet.password(6),
                };

                it("should respond with status 201 and create user when given email is unique", async () => {
                        const response = await server.post("/users/signup").send(validBody);
              
                        expect(response.status).toBe(httpStatus.CREATED);
                        expect(response.body).toEqual({
                                name: validBody.name,
                                email: validBody.email,
                        });
                });

                it("should save user on db", async () => {
                        const response = await server.post("/users/signup").send(validBody);

                        const user = await prisma.user.findFirst({
                                where: { email: response.body.email },
                        });

                        expect(user).not.toBeNull();

                });

                it("should respond with status 400 and not create user when given email is not unique", async () => {
                        await createUser(validBody);

                        const response = await server.post("/users/signup").send(validBody);

                        expect(response.status).toBe(httpStatus.BAD_REQUEST);
                });

                it("should not return user password on body", async () => {
                        const response = await server.post("/users/signup").send(validBody);

                        expect(response.body.password).toBeUndefined();
                });
        });
});