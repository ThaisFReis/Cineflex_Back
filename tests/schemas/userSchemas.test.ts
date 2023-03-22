import { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { cleanDatabase } from "../utils/helpers";
import { createUserSchema, updateUserSchema, loginSchema } from '../../src/schemas/UserSchema';

// I already have authentication tests in the auth.test.ts file, so I'm not going to test it here
// Here I'm going to test the user routes, services and schemas
 beforeAll(async () => {
        await init();
        await cleanDatabase();
});

describe("createUserSchema", () => {
    const generateParams = () => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
    });

    it("should return an error if the name is invalid", async () => {
        const input = generateParams();
        delete input.name;

        const { error } = createUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"name" is required');
    }); 

    it("should return an error if the email is invalid", async () => {
        const input = generateParams();
        delete input.email;

        const { error } = createUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"email" is required');
    });

    it("should return error if email does not follow valid email format", () => {
        const input = generateParams();
        input.email = faker.lorem.word();
  
        const { error } = createUserSchema.validate(input);
  
        expect(error).toBeDefined();
    });

    it("should return an error if the password is invalid", async () => {
        const input = generateParams();
        delete input.password;

        const { error } = createUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"password" is required');
    });

    it("should return error if password is less than 6 characters", () => {
        const input = generateParams();
        input.password = faker.lorem.word(5);
  
        const { error } = createUserSchema.validate(input);
  
        expect(error).toBeDefined();
        expect(error?.message).toBe('"password" length must be at least 6 characters long');
    });
});

describe("loginSchema", () => {
    const generateParams = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(6),
    });

    it("should return an error if the email is invalid", async () => {
        const input = generateParams();
        delete input.email;

        const { error } = loginSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"email" is required');
    });

    it("should return an error if the password is invalid", async () => {
        const input = generateParams();
        delete input.password;

        const { error } = loginSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"password" is required');
    });
});

describe("updateUserSchema", () => {
    const generateParams = () => ({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(6),
    });

    it("should return an error if the name is invalid", async () => {
        const input = generateParams();
        delete input.name;

        const { error } = updateUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"name" is required');
    }); 

    it("should return an error if the email is invalid", async () => {
        const input = generateParams();
        delete input.email;

        const { error } = updateUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"email" is required');
    });

    it("should return error if email does not follow valid email format", () => {
        const input = generateParams();
        input.email = faker.lorem.word();
  
        const { error } = updateUserSchema.validate(input);
  
        expect(error).toBeDefined();
    });

    it("should return an error if the password is invalid", async () => {
        const input = generateParams();
        delete input.password;

        const { error } = updateUserSchema.validate(input);

        expect(error).toBeDefined();
        expect(error?.message).toBe('"password" is required');
    });

    it("should return error if password is less than 6 characters", () => {
        const input = generateParams();
        input.password = faker.lorem.word(5);
    
        const { error } = updateUserSchema.validate(input);
  
        expect(error).toBeDefined();
        expect(error?.message).toBe('"password" length must be at least 6 characters long');
    });
    
});