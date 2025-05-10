import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import listingRoutes from "./routes/listings.js";

import connectDB from "./config/db.js";
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/listings", listingRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Minuteman Meals API is running");
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
});

export default app;
