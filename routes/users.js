const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const validApiKeys = require("../utils");

const users = [
  {
    name: "testuser",
    password: "testpassword",
  },
];

// GET users listing
router.get("/", (req, res, next) => {
  const apiKey = req.headers["authorization"];
  if (validApiKeys.has(apiKey)) {
    res.send(users);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// POST user to the list
router.post("/add", (req, res, next) => {
  // Generate a unique API key
  const apiKey = crypto.randomBytes(32).toString("hex");
  validApiKeys.add(apiKey);

  users.push({
    ...req.body,
    apiKey: apiKey,
  });

  res.send(`${req.body.name} added to the list`);
});

// GET user from the list
router.post("/login", (req, res, next) => {
  const response = {
    message: "",
    user: null,
    apiKey: "",
  };

  users.find((user) => {
    const { name, password } = req.body;

    if (user.name === name && user.password === password) {
      response.message = "User authenticated";
      response.user = user;
      return response;
    } else {
      return;
    }
  });

  res.send(response);
});

module.exports = router;
