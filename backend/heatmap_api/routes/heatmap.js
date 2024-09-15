const express = require('express');
const router = express.Router();
const fetchLeetCodeData = require('../controllers/leetcodeController');
const fetchCodeforcesData = require('../controllers/codeforcesController');
const fetchCodeChefData = require('../controllers/codechefController');
const fetchHackerRankData = require('../controllers/hackerrankController');
const UserStats = require('../models/userStats');

router.get('/heatmap', async (req, res) => {
  const {
    leetcodeUsername,
    codeforcesUsername,
    codechefUsername,
    hackerrankUsername
  } = req.query;

  if (!leetcodeUsername || !codeforcesUsername || !codechefUsername || !hackerrankUsername) {
    return res.status(400).json({ error: 'All platform usernames are required' });
  }

  try {
    // Check if user data exists in the database
    let userStats = await UserStats.findOne({
      leetcodeUsername,
      codeforcesUsername,
      codechefUsername,
      hackerrankUsername
    });

    if (!userStats) {
      // Fetch data from all platforms for a new user
      const leetcodeData = await fetchLeetCodeData(leetcodeUsername);
      const codeforcesData = await fetchCodeforcesData(codeforcesUsername);
      const codechefData = await fetchCodeChefData(codechefUsername);
      const hackerrankData = await fetchHackerRankData(hackerrankUsername);

      // Save new user data in the database
      userStats = new UserStats({
        leetcodeUsername,
        codeforcesUsername,
        codechefUsername,
        hackerrankUsername,
        leetcode: leetcodeData,
        codeforces: codeforcesData,
        codechef: codechefData,
        hackerrank: hackerrankData,
      });
      await userStats.save();
    }

    // Return user stats
    res.json(userStats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
