import express from "express";
import {
  getItems,
  createItem,
  editItem,
  deleteItem,
} from "../controllers/items";
import { isAuth, grantAccess } from "../middlewares/auth";

const router = express.Router();

router.get("/", getItems);
// router.post("/create", isAuth, grantAccess("createOwn", "item"), createItem);
router.post("/create", createItem);
router.put("/edit/:id", isAuth, grantAccess("updateAny", "item"), editItem);
router.delete("/delete/:id", grantAccess("deleteAny", "item"), deleteItem);

export default router;
