const express = require("express");
const router3 = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controller/userController");

// 🔹 REGISTER
router3.post("/register", registerUser);

// 🔹 LOGIN
router3.post("/login", loginUser);

module.exports = router3;