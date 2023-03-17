import express, { Express } from "express";
import cors from "cors";
import { loadEnv, connectDb, disconnectDb } from "./config"
import { userRouter, movieRouter, seatRouter, sessionRouter, saleRouter, authRouter, ticketRouter, documentRouter, paymentRouter } from "./routers";

loadEnv();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", userRouter)
  .use("/auth", authRouter)
  .use("/movies", movieRouter)
  .use("/seats", seatRouter)
  .use("/sessions", sessionRouter)
  .use("/sales", saleRouter)
  .use("/tickets", ticketRouter)
  .use("/documents", documentRouter)
  .use("/payments", paymentRouter);

export function init(): Promise<Express> {
  connectDb();
    return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDb();
}

export default app;