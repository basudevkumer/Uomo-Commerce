const { body, validationResult } = require("express-validator");

// Request-এর validation rule-গুলো চালানোর পর error আছে কি না তা পরীক্ষা করে।
const validate = (req, res, next) => {
  const errors = validationResult(req);

  // কোনো validation error থাকলে প্রথম error message পাঠিয়ে request থামিয়ে দেয়।
  if (!errors.isEmpty())
    return res
      .status(422)
      .json({ success: false, message: errors.array()[0].msg });

  // কোনো error না থাকলে পরের middleware/controller-এ request পাঠায়।
  next();
};

// নতুন user register করার সময় name, email এবং password যাচাই করে।
const registerRules = [
  // শুরু/শেষের অতিরিক্ত space বাদ দিয়ে name খালি কি না পরীক্ষা করে।
  body("name").trim().notEmpty().withMessage("Name is required"),

  // email সঠিক format-এ আছে কি না পরীক্ষা করে।
  body("email").isEmail().withMessage("A valid email is required"),

  // password কমপক্ষে ৮ অক্ষরের এবং অন্তত ১টি number আছে কি না পরীক্ষা করে।
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must include a number"),
];

// Login করার সময় email এবং password দেওয়া হয়েছে কি না যাচাই করে।
const loginRules = [
  // email সঠিক format-এ আছে কি না পরীক্ষা করে।
  body("email").isEmail().withMessage("A valid email is required"),

  // password খালি রাখা হয়েছে কি না পরীক্ষা করে।
  body("password").notEmpty().withMessage("Password is required"),
];

// যেসব request-এ শুধু email দরকার (যেমন forgot-password), সেখানে ব্যবহার হয়।
const emailRules = [
  // email সঠিক format-এ আছে কি না পরীক্ষা করে।
  body("email").isEmail().withMessage("A valid email is required"),
];

// Password তৈরি বা পরিবর্তনের সময় password-এর basic strength যাচাই করে।
const passwordRules = [
  // password কমপক্ষে ৮ অক্ষরের এবং অন্তত ১টি number আছে কি না পরীক্ষা করে।
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must include a number"),
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  emailRules,
  passwordRules,
};
