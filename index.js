import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import rootRouter from "./router/index.js";

await mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running!");
});
