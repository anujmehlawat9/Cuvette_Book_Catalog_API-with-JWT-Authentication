
// routes/userRoutes.js
import Router from "express";
import { signup, loginUser } from "../controllers/auth.js";
import upload from "../middlewares/multer.js";

const router = Router();

// POST /api/users/register
router.post("/register", signup);

// POST /api/users/login
router.post("/login", loginUser);

export default router;
