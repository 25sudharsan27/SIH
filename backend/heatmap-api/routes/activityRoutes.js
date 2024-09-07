const express = require("express");
const UserActivity = require("../models/userActivity");
const { updateHeatmap } = require("../server");

const router = express.Router();

router.post("/logActivity", async (req, res) => {
  const { userId, date, leetcodeProblemsSolved, loggedIn } = req.body;

  try {
    let activity = await UserActivity.findOne({ userId, date });
    if (!activity) {
      activity = new UserActivity({ userId, date });
    }

    if (loggedIn !== undefined) activity.loggedIn = loggedIn;
    if (leetcodeProblemsSolved !== undefined) activity.leetcodeProblemsSolved = leetcodeProblemsSolved;

    await activity.save();
    
    updateHeatmap({
      userId,
      date,
      leetcodeProblemsSolved: activity.leetcodeProblemsSolved,
      loggedIn: activity.loggedIn
    });

    res.status(200).json({ message: "Activity logged successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error logging activity" });
  }
});

module.exports = router;
