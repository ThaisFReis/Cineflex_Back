import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";
import { prisma } from "../../src/config";
import { createUser } from "../factories";

export async function cleanDatabase(): Promise<void> {
    await prisma.token.deleteMany();
  await prisma.user.deleteMany();
}

export async function generateValidToken(user?: User): Promise<string> {
    const userToUse = user || (await createUser());
    const token = jwt.sign({ userId: userToUse.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    await prisma.token.create({
        data: {
            token,
            userId: userToUse.id,
        },
    });

    return token;
}