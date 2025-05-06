const express = require("express");
const router = express.Router();
router.use(express.json());

const { registerUser, loginUser } = require("../controllers/users");
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
