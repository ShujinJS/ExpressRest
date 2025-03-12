const express = require("express");
const router = express.Router();

const users = [
  {
    name: "testuser",
    password: "testpassword",
  },
];

// GET users listing
router.get("/", (req, res, next) => {
  console.log(users);
  res.send(users);
});

// POST user to the list
router.post("/add", (req, res, next) => {
  users.push(req.body);
  res.send(`${req.body.name} added to the list`);
});

// GET user from the list
router.post("/login", (req, res, next) => {
  const response = {
    message: "",
    user: null,
  };

  users.find((user) => {
    const { name, password } = req.body;
    user.name === req.body.name;
    if (user.name === name && user.password === password) {
      response.message = "User authenticated";
      response.user = user;
      return response;
    } else {
      response.message = "User not found";
      return response;
    }
  });

  res.send(response);
});

module.exports = router;
