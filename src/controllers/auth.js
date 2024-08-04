import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "../models/User";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await UserModel.findOne({ email: emailToFind });

    if (findUser) {
      return res.status(404).json({
        message: "There is already a user with this email",
      });
    }

    if (!email) {
      return res.status(404).json({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(404).json({
        message: "Password is required",
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

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Произошла внутренняя ошибка. Повторите попытку позже.",
    });
  }
};
