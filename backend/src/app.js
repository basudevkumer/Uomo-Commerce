// .env ফাইলের environment variable-গুলো process.env-এর মধ্যে লোড করে।
require("dotenv").config();

// Backend server তৈরি এবং request handle করার জন্য Express ব্যবহার করছি।
const express = require("express");

// Frontend (ভিন্ন origin) থেকে API request আসতে দেওয়ার জন্য CORS দরকার।
const cors = require("cors");

// Cookie থেকে token পড়ার সুবিধার জন্য cookie-parser ব্যবহার করছি।
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger.js");

// Database থেকে user data আনার জন্য User model।
// Login, register, logout ইত্যাদি authentication route।
const authRoutes = require("./routes/auth.routes.js");

// Admin-only CRUD routes এবং authenticated customer profile routes।
const adminRoutes = require("./routes/admin.routes.js");
const profileRoutes = require("./routes/profile.routes.js");

// কোনো route-এ error হলে এক জায়গা থেকে error response পাঠায়।
const errorHandler = require("./middleware/errorHandler.js");

// Express application instance তৈরি করছি।
const app = express();

// কোন frontend API ব্যবহার করতে পারবে এবং cookie পাঠাতে পারবে কি না সেটি নির্ধারণ করে।
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// JSON body-কে JavaScript object হিসেবে req.body-তে পাওয়ার ব্যবস্থা করে।
app.use(express.json());

// Request-এর cookie-গুলো req.cookies-এ পাওয়ার ব্যবস্থা করে।
app.use(cookieParser());

// Server সচল আছে কি না পরীক্ষা করার জন্য একটি সহজ health-check endpoint।
app.get("/api/health", (req, res) =>
  res.json({ success: true, message: "API is running" }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// /api/auth দিয়ে শুরু হওয়া সব request auth routes-এর কাছে পাঠানো হয়।
app.use("/api/auth", authRoutes);

// Admin resources: প্রতিটি route নিজে authenticate এবং admin authorization করে।
app.use("/api/admin", adminRoutes);

// Logged-in user নিজের profile access/update করতে পারে।
app.use("/api", profileRoutes);

// উপরের route-গুলোতে ধরা না-পড়া error এখানে এসে একভাবে handle হয়।
app.use(errorHandler);

// server.js এই app-টি import করে listen() চালাবে।
module.exports = app;
