import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import connectDb from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js"; // ADD THIS
import cookieParser from "cookie-parser";
import cors from "cors";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 6000;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// server start
const startServer = async () => {
  try {
    await connectDb();
    await connectCloudinary(); // ADD THIS

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      console.log("Hello From Server");
    });
  } catch (error) {
    console.log("Server error:", error);
  }
};

startServer();
