const axios = require('axios');

async function fetchLeetCodeData(username) {
  const query = `{
    userContestRanking(username: "${username}") {
      attendedContestsCount
      rating
    }
    userProfile(username: "${username}") {
      badges { name }
      problemsSolved
    }
  }`;
  try {
    const result = await axios.post(process.env.LEETCODE_API_URL, { query });
    const data = result.data.data;
    return {
      contests: data.userContestRanking.attendedContestsCount || 0,
      badges: data.userProfile.badges || [],
      problemsSolved: data.userProfile.problemsSolved || 0,
    };
  } catch (err) {
    console.error('Error fetching LeetCode data:', err);
    return null;
  }
}

module.exports = fetchLeetCodeData;
