const axios = require('axios');
const cheerio = require('cheerio');

async function fetchCodeChefData(username) {
  try {
    const url = `${process.env.CODECHEF_PROFILE_URL}${username}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const contests = [];
    $('.rating-table tbody tr').each((i, elem) => {
      const contestName = $(elem).find('td').eq(0).text().trim();
      const rank = $(elem).find('td').eq(1).text().trim();
      if (contestName) {
        contests.push({ contestName, rank });
      }
    });

    const badges = [];
    $('.badge-title').each((i, elem) => {
      badges.push($(elem).text().trim());
    });

    const problemsSolved = parseInt($('.problems-solved > h5').text().match(/\d+/)[0]);

    return {
      contests,
      badges,
      problemsSolved
    };
  } catch (error) {
    console.error('Error fetching CodeChef data:', error);
    return {
      contests: [],
      badges: [],
      problemsSolved: 0
    };
  }
}

module.exports = fetchCodeChefData;
