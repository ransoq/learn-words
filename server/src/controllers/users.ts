import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "models/user.model";
import { IUser } from "models/user.type";

dotenv.config();

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser = await User.findOne({ email }).lean<IUser>();

    if (!user) return res.status(404).json({ message: "User doesn't exist." });

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET!, { expiresIn: "1h" });

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const user: IUser = await User.findOne({ email }).lean<IUser>();
    if (user) return res.status(404).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET!, { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
