import { body } from "express-validator";

export const registerValidator = [body("email").isEmail().withMessage("Invalid email address"), body("password").isLength({ min: 8, max: 32 }).withMessage("Password must be 8-32 characters long")];
