import express from "express";
import { login, createUser } from "../controllers/users";

const router = express.Router();

router.post("/login", login);
router.post("/create", createUser);

export default router;
