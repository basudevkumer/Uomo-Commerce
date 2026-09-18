const { Router } = require("express");
const authenticate = require("../middleware/authenticate.js");
const profile = require("../controllers/profile.controller.js");

const router = Router();
router.use(authenticate);
router.get("/me", profile.getProfile);
router.patch("/me", profile.updateProfile);

module.exports = router;
