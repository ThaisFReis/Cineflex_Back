import UserSessionRepository from "../repositories/TokenRepository";
import UserRepository from "../repositories/UserRepository";
import { exclude } from "../utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { HttpException } from "../utils/HttpException";

async function signIn(params: SignInParams): Promise<SignInResult> {
    const { email, password } = params;
    const user = await UserRepository.getUserByEmail(email);

    if (!user) {
        throw new HttpException(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new HttpException(401, "Invalid password");
    }

    const token = await createSession(user.id);

    return {
        user: exclude(user, "password"),
        token,
      };
}


async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    await UserSessionRepository.create({
      token,
      userId,
    });
  
    return token;
}


export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

const AuthService = {
    signIn,
};

export default AuthService;