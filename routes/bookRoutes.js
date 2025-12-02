// routes/bookRoutes.js
import Router from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.js";

import upload from "../middlewares/multer.js";
import { auth } from "../middlewares/auth.js";

const router = Router();

// Public
// GET /api/books
router.get("/", getBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// Protected (requires JWT)
// POST /api/books
router.post("/", auth, createBook);

// PUT /api/books/:id
router.put("/:id", auth, updateBook);

// DELETE /api/books/:id
router.delete("/:id", auth, deleteBook);

export default router;
