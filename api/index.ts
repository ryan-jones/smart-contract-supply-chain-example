import express, { Request, Response } from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import indexRouter from "./routes";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URI,
  })
);

mongoose
  .connect(process.env.MONGO_DOCKER_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err: any) => console.error("Mongoose error", err));

app.use("/api", indexRouter);

app.use((err: any, req: Request, res: Response) => {
  console.log("ERROR CAUGHT IN API", err);
  if (!err) {
    res.status(err.status || 500).send(err.message || "Server error!");
  }
});

app.listen(8080, () => {
  console.log("App is running on port 8080");
});
