import { verifyAccessToken } from "../utils/tokens.js";
export default function authenticate(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ success: false, message: "Authentication required" });
    req.user = verifyAccessToken(header.split(" ")[1]);
    next();
  } catch { return res.status(401).json({ success: false, message: "Invalid or expired access token" }); }
}
