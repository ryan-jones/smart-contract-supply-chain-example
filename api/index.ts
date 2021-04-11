import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import indexRouter from "./routes";
import cors from "cors";
// import isAuth from "./middlewares/auth";
// import { IAuth } from "./interfaces";
import { config } from "dotenv";

const app = express();
config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);

// app.use(isAuth);
console.log("INSIDE THE API WITH THIS URI", process.env.MONGO_DOCKER_URI);

mongoose
  .connect(process.env.MONGO_DOCKER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err: any) => console.error(err));

app.use("/api", indexRouter);

app.use((err: any, req: Request, res: Response) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(`${err.statusCode} - ${err.message}`);
});

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
