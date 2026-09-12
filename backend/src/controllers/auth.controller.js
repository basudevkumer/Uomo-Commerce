import User from "../models/User.js";
import { createRandomToken, hashToken, signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 };
const fail = (message, statusCode = 400) => { const error = new Error(message); error.statusCode = statusCode; return error; };
const verificationLink = (token) => `${process.env.CLIENT_URL || "http://localhost:3000"}/verify-email/${token}`;

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (await User.exists({ email: email.toLowerCase() })) throw fail("Email is already registered", 409);
    const rawToken = createRandomToken();
    const user = await User.create({ name, email, password, emailVerificationToken: hashToken(rawToken), emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000 });
    await sendEmail({ to: user.email, subject: "Verify your Uomo account", text: `Verify your account: ${verificationLink(rawToken)}` });
    // Verification is blocking at this level: a new account is not logged in until verified.
    res.status(201).json({ success: true, message: "Account created. Check your email to verify your account." });
  } catch (error) { next(error); }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user || !(await user.comparePassword(req.body.password))) throw fail("Invalid email or password", 401);
    if (!user.isEmailVerified) throw fail("Please verify your email before logging in", 403);
    res.cookie("refreshToken", signRefreshToken(user), cookieOptions).json({ success: true, accessToken: signAccessToken(user), user: user.toSafeJSON() });
  } catch (error) { next(error); }
}

export async function refresh(req, res, next) {
  try { const payload = verifyRefreshToken(req.cookies.refreshToken); const user = await User.findById(payload.id); if (!user) throw fail("User not found", 401); res.json({ success: true, accessToken: signAccessToken(user), user: user.toSafeJSON() }); }
  catch { next(fail("Invalid or expired refresh token", 401)); }
}
export function logout(req, res) { res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/" }).json({ success: true, message: "Logged out" }); }
export async function verifyEmail(req, res, next) { try { const user = await User.findOne({ emailVerificationToken: hashToken(req.params.token), emailVerificationExpires: { $gt: Date.now() } }); if (!user) throw fail("Verification token is invalid or expired", 400); user.isEmailVerified = true; user.emailVerificationToken = undefined; user.emailVerificationExpires = undefined; await user.save(); res.json({ success: true, message: "Email verified. You can now log in." }); } catch (e) { next(e); } }
export async function forgotPassword(req, res, next) { try { const user = await User.findOne({ email: req.body.email.toLowerCase() }); if (user) { const raw = createRandomToken(); user.passwordResetToken = hashToken(raw); user.passwordResetExpires = Date.now() + 15 * 60 * 1000; await user.save({ validateBeforeSave: false }); await sendEmail({ to: user.email, subject: "Reset your Uomo password", text: `Reset your password: ${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${raw}` }); } res.json({ success: true, message: "If that email exists, a password reset link has been sent." }); } catch (e) { next(e); } }
export async function resetPassword(req, res, next) { try { const user = await User.findOne({ passwordResetToken: hashToken(req.params.token), passwordResetExpires: { $gt: Date.now() } }); if (!user) throw fail("Reset token is invalid or expired", 400); user.password = req.body.password; user.passwordResetToken = undefined; user.passwordResetExpires = undefined; await user.save(); res.json({ success: true, message: "Password reset successfully. You can now log in." }); } catch (e) { next(e); } }
