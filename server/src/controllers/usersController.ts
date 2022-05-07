import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "@models/user.model";
import validateRegisterInput from "../validation/register/register";
import validateLoginInput from "../validation/login/login";

dotenv.config();

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const error = validateLoginInput(req.body);

  if (!error.isValid) {
    return res.status(400).json(error.errors);
  }

  try {
    const user = await User.findOne({ username }).lean();

    if (!user) return res.status(404).json({ message: "User doesn't exist." });

    const userPassword = await bcrypt.compare(password, user.password);

    if (!userPassword) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET_KEY!, { expiresIn: "1h" });

    res.status(200).json({ result: user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const register = async (req: Request, res: Response) => {
  const { username, email, password, confirmPassword } = req.body;

  const error = validateRegisterInput(req.body);

  if (!error.isValid) {
    return res.status(400).json(error.errors);
  }

  try {
    const user = await User.findOne({ email }).lean();
    if (user) return res.status(404).json({ message: "User already exists." });

    if (password !== confirmPassword) return res.status(400).json({ message: "Password don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY!, { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export { login, register };
