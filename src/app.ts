import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDb } from "./config"
import { userRouter, movieRouter, seatRouter, sessionRouter } from "./routers";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/users", userRouter)
  .use("/movies", movieRouter)
  .use("/seats", seatRouter)
  .use("/sessions", sessionRouter);

export function init(): Promise<Express> {
  connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;