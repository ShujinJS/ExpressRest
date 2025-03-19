const express = require("express");
const router = express.Router();

// GET users listing
router.get("/?code=:id", (req, res, next) => {
  res.send("oauth2 success");
});

module.exports = router;
