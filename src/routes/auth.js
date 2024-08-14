import { Router } from "express";
import passport from "passport";

import { registerValidator } from "../validations/auth.js";

import checkAuth from "../utils/checkAuth.js";

import { register, login, getMe } from "../controllers/auth.js";

const router = new Router();

router.post("/register", registerValidator, register);

router.post("/login", login);

router.get("/me", checkAuth, getMe);

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) => {
  res.redirect("/dashboard");
});

export default router;
