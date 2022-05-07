/* eslint-disable */
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: require("./user.model"),
};

export default db;
