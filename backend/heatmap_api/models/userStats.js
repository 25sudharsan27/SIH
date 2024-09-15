const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  leetcodeUsername: { type: String, required: true },
  codeforcesUsername: { type: String, required: true },
  codechefUsername: { type: String, required: true },
  hackerrankUsername: { type: String, required: true },
  leetcode: { contests: Array, badges: Array, problemsSolved: Number },
  codeforces: { contests: Array, rating: Number, problemsSolved: Number },
  codechef: { contests: Array, badges: Array, problemsSolved: Number },
  hackerrank: { badges: Array, problemsSolved: Number }
});

module.exports = mongoose.model('UserStats', userStatsSchema);
