import Router from "express";
import { signup, loginUser } from "../controllers/auth.js";

const router = Router();

router.post("/register", signup);
router.post("/login", loginUser);

export default router;
