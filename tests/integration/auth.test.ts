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

    it("should return an error if the email is invalid", async () => {
        const params = generateParams();
        
        try{
            await AuthService.signIn({ ...params, email: "" });
            fail("Should have thrown an error");
        }
        catch (error) {
            expect(error.statusCode).toBe(error.statusCode);
            expect(error.message).toBe("Correct credentials are required");
        }
    });

    it("should return an error if the user is not exists", async () => {
        const params = generateParams();

        try{
            await AuthService.signIn(params);
            fail("Should have thrown an error");
        }
        catch (error) {
          expect(error.statusCode).toBe(error.statusCode);
          expect(error.message).toBe("User not found");
        }
    });

    it("should return an error if the password is invalid", async () => {
        const params = generateParams();

        try{
            await AuthService.signIn({ ...params, password: faker.internet.password(6) });
        }
        catch (error) {
          expect(error.statusCode).toBe(error.statusCode);
          expect(error.message).toBe("User not found");
        }
    });

    describe("when the user is exists", () => {

        it("should create a session for the user if everything is ok", async () => {
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
                expect(error.message).toBe("Expired token");
            }
        });
    });
});