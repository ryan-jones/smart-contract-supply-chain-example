import express from "express";
import { login, createUser, editUser, deleteUser } from "../controllers/users";
import { isAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/login", login);
router.post("/create", createUser);
router.post("/edit/:id", isAuth, editUser);
router.post("/delete/:id", isAuth, deleteUser);

export default router;
