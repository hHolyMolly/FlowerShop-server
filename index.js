import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./src/routes/auth.js";

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth
app.use("/api/auth", authRoute);

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
