const axios = require('axios');
const cheerio = require('cheerio');

async function fetchHackerRankData(username) {
  try {
    const url = `${process.env.HACKERRANK_PROFILE_URL}${username}`;
    const response = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const badges = [];
    $('div.badge-info div span.badge-title').each((i, elem) => {
      badges.push($(elem).text().trim());
    });

    let problemsSolved = 0;
    $('div.profile-section').each((i, elem) => {
      const text = $(elem).text();
      if (text.includes('solved')) {
        problemsSolved = parseInt(text.match(/\d+/)[0]);
      }
    });

    return {
      badges,
      problemsSolved,
    };
  } catch (error) {
    console.error('Error fetching HackerRank data:', error);
    return {
      badges: [],
      problemsSolved: 0
    };
  }
}

module.exports = fetchHackerRankData;
