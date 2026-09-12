import crypto from "crypto";
import jwt from "jsonwebtoken";

export const createRandomToken = () => crypto.randomBytes(32).toString("hex");
export const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
// Separate access/refresh secrets are recommended. JWT_SECRET is accepted as a temporary
// fallback for the existing .env, so the API can boot while the env file is migrated.
const accessSecret = () => process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const refreshSecret = () => process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const requireSecret = (secret) => { if (!secret) throw new Error("JWT secrets are not configured"); return secret; };
export const signAccessToken = (user) => jwt.sign({ id: user._id.toString(), role: user.role }, requireSecret(accessSecret()), { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || process.env.JWT_EXPIRES_IN || "15m" });
export const signRefreshToken = (user) => jwt.sign({ id: user._id.toString() }, requireSecret(refreshSecret()), { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });
export const verifyAccessToken = (token) => jwt.verify(token, requireSecret(accessSecret()));
export const verifyRefreshToken = (token) => jwt.verify(token, requireSecret(refreshSecret()));
