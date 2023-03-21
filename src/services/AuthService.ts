import UserSessionRepository from "../repositories/TokenRepository";
import UserRepository from "../repositories/UserRepository";
import { exclude } from "../utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { HttpException } from "../utils/HttpException";

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;
  
  if (email === undefined || email === "" || password === undefined || password === "") {
      throw new HttpException(400, "Correct credentials are required");
  }
  
  const user = await UserRepository.getUserByEmail(email);

  if (!user) {
      throw new HttpException(404, "User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      throw new HttpException(400, "Correct credentials are required");
  }

  const token = await createSession(user.id);

  return {
      user: exclude(user, "password"),
      token,
  };
}


async function createSession(userId: number) {
  // The token has to expire in 1 hour
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

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