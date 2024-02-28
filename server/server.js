import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/routes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {})
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set("debug", true)