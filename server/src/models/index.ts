/* eslint-disable */
import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const db = {
  mongoose,
  user: require("./user.model"),
  role: require("./role.model"),
  ROLES: ["user", "admin"],
};

export default db;
