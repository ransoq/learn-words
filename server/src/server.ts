import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "@routes/users";
import db from "./models";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

db.mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    app.listen(PORT, () => console.log(`Server is working on PORT:${PORT}`));
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
