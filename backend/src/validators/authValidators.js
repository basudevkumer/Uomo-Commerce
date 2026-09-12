import { body, validationResult } from "express-validator";
export const validate = (req, res, next) => { const errors = validationResult(req); if (!errors.isEmpty()) return res.status(422).json({ success: false, message: errors.array()[0].msg }); next(); };
export const registerRules = [body("name").trim().notEmpty().withMessage("Name is required"), body("email").isEmail().withMessage("A valid email is required"), body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters").matches(/\d/).withMessage("Password must include a number")];
export const loginRules = [body("email").isEmail().withMessage("A valid email is required"), body("password").notEmpty().withMessage("Password is required")];
export const emailRules = [body("email").isEmail().withMessage("A valid email is required")];
export const passwordRules = [body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters").matches(/\d/).withMessage("Password must include a number")];
