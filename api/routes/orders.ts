import express from "express";
import {
  getOrders,
  createOrder,
  editOrder,
  deleteOrder,
} from "../controllers/orders";
import { isAuth, grantAccess } from "../middlewares/auth";

const router = express.Router();

router.get("/:id", getOrders);
// router.post("/create", isAuth, grantAccess("createOwn", "Order"), createOrder);
router.post("/create", createOrder);
router.put("/edit/:id", isAuth, grantAccess("updateAny", "order"), editOrder);
router.delete("/delete/:id", grantAccess("deleteAny", "order"), deleteOrder);

export default router;
