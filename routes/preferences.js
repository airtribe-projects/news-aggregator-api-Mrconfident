const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/users");
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ preferences: user.preferences || {} });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/", authMiddleware, async (req, res) => {
  try {
    const { categories, languages } = req.body;

    const updated = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        preferences: {
          categories: categories || [],
          languages: languages || [],
        },
      },
      { new: true }
    );

    res.status(200).json({ preferences: updated.preferences });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
