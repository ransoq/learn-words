import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import userRouter from "@routes/users";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

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
