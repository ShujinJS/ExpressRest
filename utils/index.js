// In-memory storage for demonstration purposes
const validApiKeys = new Set(["TEST_API_KEY"]);

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["authorization"];
  if (!apiKey || !validApiKeys.has(apiKey)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

module.exports = validateApiKey;
module.exports = validApiKeys;
