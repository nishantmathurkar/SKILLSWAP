const express = require("express");
const router = express.Router();

const User = require("../models/userModel");

// ======================
// REGISTER USER
// ======================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// LOGIN USER
// ======================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// LOGOUT USER (FIXED)
// ======================
router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logout successful"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;