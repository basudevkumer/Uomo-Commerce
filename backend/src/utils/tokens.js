const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// Email verification এবং password reset-এর জন্য নিরাপদ random token তৈরি করে।
const createRandomToken = () => crypto.randomBytes(32).toString("hex");

// Raw token database-এ না রেখে তার hash save করা হয়।
// ফলে database leak হলেও আসল token সরাসরি ব্যবহার করা যায় না।
const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// Access এবং refresh token-এর জন্য আলাদা secret ব্যবহার করা recommended।
// Migration চলাকালে পুরোনো JWT_SECRET temporary fallback হিসেবে রাখা হয়েছে।
const accessSecret = () =>
  process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const refreshSecret = () =>
  process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;

// Secret key না থাকলে application চালু না করে স্পষ্ট error দেখায়।
const requireSecret = (secret) => {
  if (!secret) throw new Error("JWT secrets are not configured");
  return secret;
};

// Short-lived access token তৈরি করে।
// এটি API request authenticate করার জন্য frontend-এ পাঠানো হয়।
// role রাখা হয়েছে protected admin/role-based route যাচাই করার জন্য।
const signAccessToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), role: user.role },
    requireSecret(accessSecret()),
    {
      expiresIn:
        process.env.JWT_ACCESS_EXPIRES_IN ||
        process.env.JWT_EXPIRES_IN ||
        "15m",
    },
  );

// Long-lived refresh token তৈরি করে।
// Access token expire হলে এর সাহায্যে নতুন access token নেওয়া যায়।
// এটি সাধারণত httpOnly cookie-তে রাখা হয়; তাই browser JavaScript সরাসরি পড়তে পারে না।
const signRefreshToken = (user) =>
  jwt.sign({ id: user._id.toString() }, requireSecret(refreshSecret()), {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  });

// Access token সঠিক, পরিবর্তিত হয়নি এবং expire করেনি—এসব যাচাই করে।
const verifyAccessToken = (token) =>
  jwt.verify(token, requireSecret(accessSecret()));

// Refresh token সঠিক, পরিবর্তিত হয়নি এবং expire করেনি—এসব যাচাই করে।
const verifyRefreshToken = (token) =>
  jwt.verify(token, requireSecret(refreshSecret()));

module.exports = {
  createRandomToken,
  hashToken,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
