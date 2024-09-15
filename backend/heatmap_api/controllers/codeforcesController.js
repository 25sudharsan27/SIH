const axios = require('axios');

async function fetchCodeforcesData(username) {
  try {
    const contestsResponse = await axios.get(`${process.env.CODEFORCES_API_URL}/user.rating?handle=${username}`);
    const problemsResponse = await axios.get(`${process.env.CODEFORCES_API_URL}/user.status?handle=${username}`);
    const contests = contestsResponse.data.result;
    const problemsSolved = problemsResponse.data.result.filter(p => p.verdict === 'OK').length;

    return {
      contests,
      problemsSolved,
    };
  } catch (err) {
    console.error('Error fetching Codeforces data:', err);
    return null;
  }
}

module.exports = fetchCodeforcesData;
