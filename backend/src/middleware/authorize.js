export default (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ success: false, message: "You do not have permission to access this resource" });
