import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validateRegisterInput from "validation/register/register";
import validateLoginInput from "validation/login/login";
import User from "models/User";
import IUser from "models/User.type";

const router = express.Router();

router.post("/register", (req, res) => {
  const data = req.body as IUser;
  const { errors, isValid } = validateRegisterInput(data);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: data.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (error, hash) => {
        if (error) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((userData) => res.json(userData))
          .catch((e) => console.log(e));
      });
    });
  });
});
