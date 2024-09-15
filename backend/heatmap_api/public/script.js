document.getElementById('heatmapForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const leetcodeUsername = document.getElementById('leetcodeUsername').value;
    const codeforcesUsername = document.getElementById('codeforcesUsername').value;
    const codechefUsername = document.getElementById('codechefUsername').value;
    const hackerrankUsername = document.getElementById('hackerrankUsername').value;
    
    try {
        const response = await fetch(`/api/heatmap?leetcodeUsername=${leetcodeUsername}&codeforcesUsername=${codeforcesUsername}&codechefUsername=${codechefUsername}&hackerrankUsername=${hackerrankUsername}`);
        const data = await response.json();

        if (response.ok) {
            displayResults(data);
        } else {
            document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>Error fetching data</p>`;
    }
});

function displayResults(data) {
    let resultHTML = '<h2>Stats:</h2>';
    
    resultHTML += '<div class="result-item"><strong>LeetCode:</strong>';
    resultHTML += `<p>Contests Attended: ${data.leetcode.contests}</p>`;
    resultHTML += `<p>Badges: ${data.leetcode.badges.map(b => b.name).join(', ')}</p>`;
    resultHTML += `<p>Problems Solved: ${data.leetcode.problemsSolved}</p></div>`;

    resultHTML += '<div class="result-item"><strong>Codeforces:</strong>';
    resultHTML += `<p>Contests: ${data.codeforces.contests.map(c => c.contestName).join(', ')}</p>`;
    resultHTML += `<p>Problems Solved: ${data.codeforces.problemsSolved}</p></div>`;

    resultHTML += '<div class="result-item"><strong>CodeChef:</strong>';
    resultHTML += `<p>Contests: ${data.codechef.contests.map(c => c.contestName).join(', ')}</p>`;
    resultHTML += `<p>Badges: ${data.codechef.badges.join(', ')}</p>`;
    resultHTML += `<p>Problems Solved: ${data.codechef.problemsSolved}</p></div>`;

    resultHTML += '<div class="result-item"><strong>HackerRank:</strong>';
    resultHTML += `<p>Badges: ${data.hackerrank.badges.join(', ')}</p>`;
    resultHTML += `<p>Problems Solved: ${data.hackerrank.problemsSolved}</p></div>`;

    document.getElementById('result').innerHTML = resultHTML;
}
