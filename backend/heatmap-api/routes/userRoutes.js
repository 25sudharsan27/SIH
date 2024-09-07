const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: String,
  leetcodeUsername: String,
});

const UserModel = mongoose.model("User", User);

router.post("/register", async (req, res) => {
  const { username, leetcodeUsername } = req.body;
  try {
    const user = await UserModel.findOneAndUpdate(
      { username },
      { username, leetcodeUsername },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: "User registered/updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

module.exports = router;
