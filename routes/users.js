const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const userModel = require("../models/users");
const router = express.Router();

const registerUserHandler = async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
    });
    user.save();
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
router.post("/register", registerUserHandler);

const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
router.post("/login", loginUserHandler);
