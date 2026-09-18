// User model দিয়ে database-এ user খোঁজা, তৈরি ও update করা হয়।
const User = require("../models/User.js");

// Token তৈরি, hash, sign এবং verify করার reusable helper functions।
const {
  createRandomToken,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/tokens.js");

// Verification/reset link পাঠানোর email helper।
const sendEmail = require("../utils/sendEmail.js");
const buildLoginSuccessEmail = require("../utils/loginEmail.js");

// Refresh token cookie-এর security settings।
// httpOnly থাকায় browser JavaScript এই cookie পড়তে পারে না (XSS risk কমে)।
// production-এ secure: true হওয়ায় cookie শুধু HTTPS connection-এ যাবে।
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// একই format-এ custom error বানানোর ছোট helper।
// পরের error middleware error.statusCode দেখে সঠিক HTTP response পাঠাতে পারবে।
const fail = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Email verification-এর জন্য frontend link তৈরি করে।
// CLIENT_URL না থাকলে local development URL ব্যবহার হবে।
const verificationLink = (token) =>
  `${process.env.CLIENT_URL || "http://localhost:3000"}/verify-email/${token}`;

// Verification email-এর HTML version তৈরি করে।
// text version-ও পাঠানো হয়, যাতে HTML support না করা email client-এও link দেখা যায়।
const verificationEmailHtml = (link) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222; max-width: 560px; margin: 0 auto;">
    <h2>Welcome to Uomo</h2>
    <p>Please verify your email address to activate your account.</p>
    <p>
      <a href="${link}" style="display: inline-block; padding: 12px 20px; background: #111; color: #fff; text-decoration: none; border-radius: 4px;">
        Verify Email
      </a>
    </p>
    <p>This verification link will expire in 24 hours.</p>
    <p>If you did not create this account, you can ignore this email.</p>
  </div>
`;

// নতুন user register করে এবং email verification link পাঠায়।
async function register(req, res, next) {
  try {
    // Client থেকে পাঠানো form data নেওয়া হচ্ছে।
    const { name, email, password } = req.body;

    // একই email দিয়ে আগেই account থাকলে নতুন account তৈরি বন্ধ করা হয়।
    if (await User.exists({ email: email.toLowerCase() }))
      throw fail("Email is already registered", 409);

    // Email-এ পাঠানোর জন্য আসল token তৈরি করা হয়।
    // নিরাপত্তার জন্য database-এ আসল token নয়, তার hash রাখা হবে।
    const rawToken = createRandomToken();

    // নতুন user create করা হচ্ছে এবং 24 ঘণ্টার verification token save করা হচ্ছে।
    const user = await User.create({
      name,
      email,
      password,
      emailVerificationToken: hashToken(rawToken),
      emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000,
    });

    // আসল token-সহ verification link user-এর email-এ পাঠানো হচ্ছে।
    const link = verificationLink(rawToken);
    await sendEmail({
      to: user.email,
      subject: "Verify your Uomo account",
      text: `Verify your account: ${link}\n\nThis link will expire in 24 hours.`,
      html: verificationEmailHtml(link),
    });
    // Account তৈরি হলেও user এখনই login করতে পারবে না; আগে email verify করতে হবে।
    res.status(201).json({
      success: true,
      message: "Account created. Check your email to verify your account.",
    });
  } catch (error) {
    // যেকোনো error central error-handling middleware-এ পাঠানো হচ্ছে।
    next(error);
  }
}

// Email/password মিলিয়ে user login করায় এবং দুটি token দেয়।
async function login(req, res, next) {
  try {
    // Email case-insensitive রাখার জন্য lowercase করে user খোঁজা হচ্ছে।
    const user = await User.findOne({ email: req.body.email.toLowerCase() });

    // User না থাকলে, বা password hash-এর সাথে না মিললে একই generic error দেওয়া হয়।
    // এতে attacker বুঝতে পারে না কোন email-গুলো registered।
    if (!user || !(await user.comparePassword(req.body.password)))
      throw fail("Invalid email or password", 401);

    // Verified নয় এমন account login করতে পারবে না।
    if (!user.isEmailVerified)
      throw fail("Please verify your email before logging in", 403);

    // Suspended account নতুন session তৈরি করতে পারবে না।
    if (user.status === "suspended") throw fail("This account is suspended", 403);

    // A mail provider failure must not turn a successful login into a failed login.
    try {
      await sendEmail({ to: user.email, ...buildLoginSuccessEmail(user) });
    } catch (emailError) {
      console.error("Unable to send login notification email", emailError.message);
    }

    // Refresh token নিরাপদ httpOnly cookie-তে রাখা হয়।
    // Access token response body-তে যায়, frontend API request authorize করতে এটি ব্যবহার করবে।
    res.cookie("refreshToken", signRefreshToken(user), cookieOptions).json({
      success: true,
      accessToken: signAccessToken(user),
      user: user.toSafeJSON(),
    });
  } catch (error) {
    next(error);
  }
}

// Refresh token ব্যবহার করে নতুন short-lived access token দেয়।
async function refresh(req, res, next) {
  try {
    // Cookie থেকে refresh token verify করে তার ভেতরের user id পাওয়া হচ্ছে।
    const payload = verifyRefreshToken(req.cookies.refreshToken);

    // Token valid হলেও user delete হয়ে যেতে পারে, তাই database থেকে আবার user নেওয়া হয়।
    const user = await User.findById(payload.id);
    if (!user) throw fail("User not found", 401);

    // নতুন access token এবং safe user data ফেরত দেওয়া হচ্ছে।
    res.json({
      success: true,
      accessToken: signAccessToken(user),
      user: user.toSafeJSON(),
    });
  } catch {
    // Missing, invalid অথবা expired refresh token—সব ক্ষেত্রেই একই response।
    next(fail("Invalid or expired refresh token", 401));
  }
}

// Refresh token cookie মুছে দিয়ে user-কে logout করায়।
function logout(req, res) {
  res
    // Cookie clear করতে cookie তৈরির সময়ের মূল security options মিলিয়ে দেওয়া হয়।
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    })
    .json({ success: true, message: "Logged out" });
}

// Email-এ পাঠানো token ঠিক ও সময়ের মধ্যে থাকলে account verify করে।
async function verifyEmail(req, res, next) {
  try {
    // URL-এর raw token hash করে database-এ রাখা hash-এর সাথে মিলানো হচ্ছে।
    // একই সাথে token expiry সময় পার হয়েছে কি না যাচাই করা হচ্ছে।
    const user = await User.findOne({
      emailVerificationToken: hashToken(req.params.token),
      emailVerificationExpires: { $gt: Date.now() },
    });
    if (!user) throw fail("Verification token is invalid or expired", 400);

    // Verification সফল: status true করা এবং token দুটো মুছে দেওয়া হয়
    // যাতে একই link দ্বিতীয়বার ব্যবহার করা না যায়।
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    res.json({ success: true, message: "Email verified. You can now log in." });
  } catch (e) {
    next(e);
  }
}

// Password ভুলে গেলে reset link পাঠানোর request handle করে।
async function forgotPassword(req, res, next) {
  try {
    // Email address দিয়ে user খোঁজা হচ্ছে।
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      // 15 মিনিটের জন্য একবার ব্যবহারযোগ্য reset token তৈরি ও hash করে save করা হচ্ছে।
      const raw = createRandomToken();
      user.passwordResetToken = hashToken(raw);
      user.passwordResetExpires = Date.now() + 15 * 60 * 1000;

      // Password পরিবর্তন হচ্ছে না, তাই password-related validation এই save-এ skip করা হচ্ছে।
      await user.save({ validateBeforeSave: false });

      // User থাকলেই কেবল reset link email করা হয়।
      await sendEmail({
        to: user.email,
        subject: "Reset your Uomo password",
        text: `Reset your password: ${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${raw}`,
      });
    }

    // User পাওয়া যাক বা না যাক, একই message পাঠানো হয়।
    // এতে অন্য কেউ অনুমান করতে পারে না কোন email দিয়ে account আছে।
    res.json({
      success: true,
      message: "If that email exists, a password reset link has been sent.",
    });
  } catch (e) {
    next(e);
  }
}

// Reset link-এর token যাচাই করে নতুন password save করে।
async function resetPassword(req, res, next) {
  try {
    // URL token-এর hash এবং expiry মিলিয়ে বৈধ reset request খোঁজা হচ্ছে।
    const user = await User.findOne({
      passwordResetToken: hashToken(req.params.token),
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw fail("Reset token is invalid or expired", 400);

    // নতুন plain password assign করা হচ্ছে। User model-এর pre-save hook এটি hash করবে।
    user.password = req.body.password;

    // Reset token মুছে দেওয়া হচ্ছে, যেন link পুনরায় ব্যবহার করা না যায়।
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (e) {
    next(e);
  }
}

// এই controller-এর functions route file থেকে ব্যবহার করার জন্য export করা হচ্ছে।
module.exports = {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
