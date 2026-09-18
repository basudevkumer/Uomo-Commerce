function errorHandler(err, req, res, next) {
  // Missing/expired credentials are expected client errors, not server failures.
  if (!err.statusCode || err.statusCode >= 500) console.error(err);
  if (err.code === 11000) return res.status(409).json({ success: false, message: "Email is already registered" });
  res.status(err.statusCode || 500).json({ success: false, message: err.message || "Server error" });
}
module.exports = errorHandler;
