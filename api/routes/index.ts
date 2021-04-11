import express from "express";
import userRoutes from "./users";

const router = express.Router();

router.use("/", (req, res, next) => {
  res.send("Api is working!");
});
router.use("/user", userRoutes);

export default router;
