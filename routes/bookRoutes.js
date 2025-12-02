import Router from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.js";

import { auth } from "../middlewares/auth.js";

const router = Router();

// Public Routes
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected Routes
router.post("/", auth, createBook);
router.put("/:id", auth, updateBook);
router.delete("/:id", auth, deleteBook);

export default router;
