import express from "express";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import cors from "cors";
import mongoInit from "./models/config";
require("dotenv").config();
mongoInit();

const app = express();
const Port = process.env.PORT;
app.use(cors());
app.use(fileupload());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  try {
    res.status(200).send("Health Ok");
  } catch (error) {
    console.log(error.message);
  }
});

import TodoRouter from "./routes/todo";
app.use("/api", TodoRouter);

app.listen(Port, (err, req, res) => {
  if (err) throw err;
  else {
    console.log(`app running on http://localhost:${Port}`);
  }
});
