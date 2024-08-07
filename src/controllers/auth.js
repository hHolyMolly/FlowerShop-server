import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array()[0];
      return res.status(400).json({ message: msg });
    }

    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email });

    if (findUser) {
      return res.status(400).json({
        message: "This email is already registered. Please use a different email",
      });
    }

    const passwordSalt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    const doc = new UserModel({
      email,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const { passHash, ...userData } = user._doc;

    res.json({
      user: userData,
      token,
      message: "Registration successful!",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        message: "No user",
      });
    }

    const user = findUser._doc;

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(404).json({
        message: "No user or pass",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const { passwordHash, ...userData } = user;

    res.json({
      user: userData,
      token,
      message: "Login successful!",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const findUser = await UserModel.findById(req.userId);

    if (!findUser) {
      return res.status(404).json({
        message: "No user",
      });
    }

    const { passwordHash, ...userData } = findUser._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
