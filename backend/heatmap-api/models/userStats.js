const mongoose = require("mongoose");

const UserActivitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    date: { type: String, required: true },
    leetcodeProblemsSolved: { type: Number, default: 0 },
    loggedIn: { type: Boolean, default: false }
});

module.exports = mongoose.model("UserActivity", UserActivitySchema);

