import { Schema, model } from "mongoose";

import IUser from "./User.type";

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    password: {
      type: String,
      min: [6, "Password must be at least 6 characters, got {VALUE}"],
      max: [30, "Password must be less 30 characters, got {VALUE}"],
      required: [true, "Password is required"],
    },
    confirmPassword: {
      type: String,
      required: [true, "Second password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>("Users", UserSchema);

export default UserModel;
