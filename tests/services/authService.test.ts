import { init } from "../../src/app";
import { prisma } from "../../src/config";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories";
import { cleanDatabase } from "../utils/helpers";
import AuthService from "../../src/services/AuthService";

beforeAll(async () => {
    await init();
    await cleanDatabase();
});

describe("Sign in", () => {
    const generateParams = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(6),
    });

    it("should return an error if the user is not given an email", async () => {
        const params = generateParams();
        
        try{
            await AuthService.signIn({ ...params, email: "" });
            fail("Should have thrown an error");
        }
        catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("Email is required");
        }
    });

    it("should return an error if the user is not given a password", async () => {
        const params = generateParams();
        
        try{
            await AuthService.signIn({ ...params, password: "" });
            fail("Should have thrown an error");
        }
        catch (error) {
            expect(error.statusCode).toBe(400);
            expect(error.message).toBe("Password is required");
        }
    });

    it("should return an error if the user is not found", async () => {
        const params = generateParams();

        try{
            await AuthService.signIn(params);
        }
        catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("User not found");
        }
    });

    it("should return an error if the password is invalid", async () => {
        const params = generateParams();
        const user = await createUser(params);

        try{
            await AuthService.signIn({ ...params, password: faker.internet.password(6) });
        }
        catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Invalid password");
        }
    });

    it("should return an error if the email is invalid", async () => {
        const params = generateParams();
        const user = await createUser(params);

        try{
            await AuthService.signIn({ ...params, email: faker.internet.email() });
        }
        catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("User not found");
        }
    });

    it("should return an error if the email and password are invalid", async () => {
        const params = generateParams();
        const user = await createUser(params);

        try{
            await AuthService.signIn({ ...params, email: faker.internet.email(), password: faker.internet.password(6) });
        }
        catch (error) {
            expect(error.statusCode).toBe(404);
            expect(error.message).toBe("User not found");
        }
    });

    it("should return the user and a token if the email and password are valid", async () => {
        const params = generateParams();
        const user = await createUser(params);
        const result = await AuthService.signIn(params);

        expect(result.user).toEqual({
            id: user.id,
            email: user.email,
        });
        expect(result.token).toBeTruthy();
    });

    it("should create a session for the user", async () => {
        const params = generateParams();
        const user = await createUser(params);
        const result = await AuthService.signIn(params);

        const session = await prisma.token.findFirst({
            where: {
                token: result.token,
            },
        });

        expect(session).not.toBeNull();
        if (session) {
            expect(session.userId).toBe(user.id);
        }
    
    });

    it("should return an error if the token is invalid", async () => {
        const params = generateParams();
        const user = await createUser(params);

        try{
            await AuthService.signIn({ email: params.email, password: params.password });
        }
        catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Invalid token");
        }
    });

    it("should return an error if the token is expired", async () => {
        const params = generateParams();
        const user = await createUser(params);

        try{
            await AuthService.signIn({ email: params.email, password: params.password });
        }
        catch (error) {
            expect(error.statusCode).toBe(401);
            expect(error.message).toBe("Invalid token");
        }
    });
});