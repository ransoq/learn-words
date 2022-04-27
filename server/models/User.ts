import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  password: string;
  email: string;
  date?: DateConstructor | number;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const UserModel = model<IUser>('users', UserSchema);
export default UserModel;