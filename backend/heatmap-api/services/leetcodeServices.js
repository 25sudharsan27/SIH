const fetch = require('node-fetch');
const UserActivity = require('../models/userActivity');

const fetchLeetCodeActivity = async (username) => {
    const query = `
    {
      matchedUser(username: "${username}") {
        userCalendar {
          submissionCalendar
        }
      }
    }`;

    const response = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
    });

    const result = await response.json();
    const submissionCalendar = JSON.parse(result.data.matchedUser.userCalendar.submissionCalendar);

    return submissionCalendar;
};

const storeLeetCodeActivity = async (userId, username) => {
    const leetcodeData = await fetchLeetCodeActivity(username);

    for (const [timestamp, solvedCount] of Object.entries(leetcodeData)) {
        const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
        
        let activity = await UserActivity.findOne({ userId, date });
        if (!activity) {
            activity = new UserActivity({ userId, date });
        }
        activity.leetcodeProblemsSolved = solvedCount;
        await activity.save();
    }
};

module.exports = { storeLeetCodeActivity };
