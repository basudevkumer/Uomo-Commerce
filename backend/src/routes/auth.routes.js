const { Router } = require("express");

// Authentication সম্পর্কিত controller-এর সব method এখানে ব্যবহার করা হবে।
const auth = require("../controllers/auth.controller.js");

// Login/Register endpoint-এ অতিরিক্ত request ঠেকানোর জন্য rate limiter।
const { authRateLimiter } = require("../middleware/rateLimiter.js");

// প্রতিটি request-এর input যাচাই করার rules এবং validation middleware।
const {
  emailRules,
  loginRules,
  passwordRules,
  registerRules,
  validate,
} = require("../validators/authValidators.js");

// এই router-এর মাধ্যমে authentication-এর সব route তৈরি করা হচ্ছে।
const router = Router();

// নতুন account তৈরি করে।
// ধাপ: rate limit check -> input validation rules -> validation result check -> register controller
router.post(
  "/register",
  authRateLimiter,
  registerRules,
  validate,
  auth.register,
);

// user-এর email/password যাচাই করে login করায়।
// Login endpoint-এ brute-force request কমাতে rate limiter ব্যবহার করা হয়েছে।
router.post("/login", authRateLimiter, loginRules, validate, auth.login);

// Refresh token ব্যবহার করে নতুন access token তৈরি করে।
router.post("/refresh", auth.refresh);

// User-এর বর্তমান session/token invalidate করে logout সম্পন্ন করে।
router.post("/logout", auth.logout);

// Frontend verification page token পাওয়ার পর এই endpoint-এ POST করে account verify করবে।
router.post("/verify-email/:token", auth.verifyEmail);

// Password reset করার জন্য user-এর email গ্রহণ করে reset process শুরু করে।
router.post("/forgot-password", emailRules, validate, auth.forgotPassword);

// Reset token যাচাই করে নতুন password সেট করে।
router.post(
  "/reset-password/:token",
  passwordRules,
  validate,
  auth.resetPassword,
);

// অন্য file-এ app.use() দিয়ে এই authentication router যুক্ত করার জন্য export করা হচ্ছে।
module.exports = router;
