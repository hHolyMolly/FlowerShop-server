import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./src/routes/auth.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoute);

app.post("/api/test", (req, res) => {
  console.log("Request received:", req.body);
  res.send(`POST request received with data: ${JSON.stringify(req.body)}`);
});

mongoose
  .connect(process.env.MONGO_DB_CONNECT)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log("DB ERROR", err);
  });

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
