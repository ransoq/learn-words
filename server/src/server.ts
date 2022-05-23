import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRouter from "@routes/users/users";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use("/user", userRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Successfully connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server is working on PORT:${PORT}`));
  } catch (error) {
    console.error("Connection error", error);
    process.exit();
  }
};

startServer();
