const express = require("express");
const router = express.Router();
router.use(express.json());
const { body, validationResult } = require("express-validator");

const { registerUser, loginUser } = require("../controllers/users");
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  registerUser
);
router.post("/login", loginUser);

module.exports = router;
