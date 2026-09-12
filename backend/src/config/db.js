import mongoose from "mongoose";

export default async function connectDB() {
  // MONGO_URI is the documented name. The fallback keeps the existing local .env working
  // while it is migrated from the original MONGDB_URL typo.
  const mongoUri = process.env.MONGO_URI || process.env.MONGDB_URL;
  if (!mongoUri) throw new Error("MONGO_URI is not configured");
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
