const User = require("../models/User.js");

async function getProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    res.json({ success: true, user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (typeof req.body.name === "string" && req.body.name.trim()) user.name = req.body.name.trim();
    await user.save();
    res.json({ success: true, user: user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
}

module.exports = { getProfile, updateProfile };
