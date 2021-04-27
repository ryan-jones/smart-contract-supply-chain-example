import express from "express";
import userRoutes from "./users";
import itemRoutes from "./items";
const router = express.Router();

router.use("/user", userRoutes);
router.use("/items", itemRoutes);

export default router;
