import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// importing routes
import { homeRoute } from "./routes/home";
import { postRoute } from "./routes/post";

// configure dotenv
dotenv.config();

const app = express();

// cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

const PORT = process.env.PORT || 5000;

// clear the log
console.clear();

app.use("/", homeRoute);
app.use("/post", postRoute);

app.listen(PORT, () => {
  console.log(`Server is listing on port ${PORT}`);
});
