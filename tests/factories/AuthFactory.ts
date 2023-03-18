import { Token } from "@prisma/client";
import { prisma } from "../../src/config";
import { createUser } from "../factories";

export async function createSession (token: string): Promise<Token> {
    const user = await createUser();

    return prisma.token.create({
        data: {
            token,
            userId: user.id,
        },
    });
}