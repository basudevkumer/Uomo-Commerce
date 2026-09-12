import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import authenticate from "./middleware/authenticate.js";
import authorize from "./middleware/authorize.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000", credentials: true }));
app.use(express.json()); app.use(cookieParser());
app.get("/api/health", (req, res) => res.json({ success: true, message: "API is running" }));
app.use("/api/auth", authRoutes);
// This proves backend authorization; frontend middleware is only a UX convenience.
app.get("/api/admin/users", authenticate, authorize("admin"), async (req, res) => { const { default: User } = await import("./models/User.js"); res.json({ success: true, users: await User.find().select("-password -emailVerificationToken -passwordResetToken") }); });
app.use(errorHandler);
export default app;
