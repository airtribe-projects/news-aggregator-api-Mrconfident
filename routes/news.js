const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/users");

const API_KEY = process.env.NEWS_API_KEY;
const api_endpoint = `https://gnews.io/api/v4/top-headlines`;

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user || !user.preferences) {
      return res.status(400).json({ error: "User preferences not set" });
    }

    const { categories = [], languages = [] } = user.preferences;

    const category = categories[0] || "general";
    const language = languages[0] || "en";
    const response = await axios.get(api_endpoint, {
      params: {
        category,
        lang: language,
        apikey: API_KEY,
      },
    });
    console.log(response.data);
    res.status(200).json({ articles: response.data });
  } catch (err) {
    console.error("Error fetching news:", err.message);
    res.status(502).json({ error: "Failed to fetch news articles" });
  }
});

module.exports = router;
