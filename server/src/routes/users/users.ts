import express from "express";

import { login, register, auth } from "@controllers/users";
import authMiddleware from "@middleware/auth";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/auth", authMiddleware, auth);

export default router;
