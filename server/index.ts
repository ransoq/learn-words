import express from "express";
import mongoose, { CallbackError } from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

mongoose.connect(process.env.MONGO_URI!, (err: CallbackError) => {
  if (err) {
    console.log(`Something went wrong -> ${err}`);
  } else {
    console.log("Mongoose connected");
  }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.listen(PORT, () => console.log(`Server is working on PORT:${PORT}`));
