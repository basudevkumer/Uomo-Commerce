require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User.js");
const connectDB = require("../config/db.js");

async function seedDemoAdmin() {
  if (process.env.DEMO_MODE !== "true") {
    throw new Error("Set DEMO_MODE=true before running the demo admin seed");
  }
  if (!process.env.DEMO_ADMIN_EMAIL || !process.env.DEMO_ADMIN_PASSWORD)
    throw new Error("DEMO_ADMIN_EMAIL and DEMO_ADMIN_PASSWORD are required");

  await connectDB();
  const email = process.env.DEMO_ADMIN_EMAIL.toLowerCase().trim();
  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.role !== "admin") throw new Error("The demo admin email belongs to a non-admin user");
    console.log(`Demo admin already exists: ${email}`);
    return;
  }

  await User.create({
    name: "Demo Admin",
    email,
    password: process.env.DEMO_ADMIN_PASSWORD,
    role: "admin",
    status: "active",
    isEmailVerified: true,
  });
  console.log(`Demo admin created: ${email}`);
}

seedDemoAdmin()
  .catch((error) => {
    console.error("Unable to seed demo admin", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
