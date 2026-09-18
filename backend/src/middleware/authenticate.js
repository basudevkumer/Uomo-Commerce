const { verifyAccessToken } = require("../utils/tokens.js");
const User = require("../models/User.js");

async function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "Authentication required" });
    const payload = verifyAccessToken(header.split(" ")[1]);
    const user = await User.findById(payload.id).select("role status");
    if (!user || user.status === "suspended") return res.status(401).json({ success: false, message: "Account is unavailable" });
    // Database-এর current role ব্যবহার করছি, JWT-এর পুরোনো role নয়।
    req.user = { id: user._id.toString(), role: user.role };
    next();
  } catch { return res.status(401).json({ success: false, message: "Invalid or expired access token" }); }
}
module.exports = authenticate;
