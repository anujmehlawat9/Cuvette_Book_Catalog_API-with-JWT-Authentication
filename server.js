import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors()); // allow frontend or Postman to access API
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form bodies

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Root endpoint 
app.get("/", (req, res) => {
  res.json({ message: "Book Catalog API is running..." });
});

// 404 handler (for undefined routes)
app.use((req, res) => {
  res.status(404).json({ error: "Route Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
