import { Router } from "express";

import { registerValidator } from "../validations/auth.js";

import checkAuth from "../utils/checkAuth.js";

import { register, login, getMe } from "../controllers/auth.js";

const router = new Router();

router.post("/register", registerValidator, register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

export default router;
