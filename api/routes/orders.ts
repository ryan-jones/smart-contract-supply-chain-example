import express from "express";
import {
  getOrders,
  createOrder,
  editOrder,
  deleteOrder,
  getSingleOrder,
} from "../controllers/orders";
import { isAuth, grantAccess } from "../middlewares/auth";

const router = express.Router();

router.get("/all/:id", getOrders);
router.post("/one/:id", getSingleOrder);
// router.post("/create", isAuth, grantAccess("createOwn", "Order"), createOrder);
router.post("/create", createOrder);
router.put("/edit/:id", isAuth, grantAccess("updateAny", "order"), editOrder);
router.delete("/delete/:id", grantAccess("deleteAny", "order"), deleteOrder);

export default router;
