const express = require("express");
const crypto = require("crypto");
const router = express.Router();

app.post("/generateApiKey", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  // Store the API key with associated user ID
  apiKeys.set(apiKey, userId);

  // Return the generated API key
  res.json({ apiKey });
});

module.exports = router;
