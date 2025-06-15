import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes.js";
// import cloudinary from "./routes/cloudinary.js";
import bookRoutes from "./routes/bookRoutes.js";
import cloudinaryRoutes from "./routes/cloudinary.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectDB();
});
