import express from "express";

import { login, register } from "@controllers/usersController";
import auth from "@middleware/auth";

const router = express.Router();

router.post("/login", auth, login);

router.post("/register", register);

export default router;
