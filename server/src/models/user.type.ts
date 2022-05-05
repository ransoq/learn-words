import { ObjectId } from "mongoose";

export interface IUser {
  username: string;
  password: string;
  email: string;
  _id: ObjectId;
}

export interface IRegisterUser extends IUser {
  confirmPassword: string;
}
