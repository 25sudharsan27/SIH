function calculateSkillMatch(userSkills, jobSkills) {
    // Create a jobSkillVector with the same length as jobSkills, initialized to 0
    const jobSkillVector = new Array(jobSkills.length).fill(0);
    let similarity = 0;

    // Count matching skills
    for (let i = 0; i < jobSkills.length; i++) {
        if (userSkills.includes(jobSkills[i])) {
            jobSkillVector[i] = 1;
            similarity += 1;
        }
    }

    // Calculate similarity as a percentage
    similarity = similarity / jobSkills.length;
    console.log("similarity:", similarity);

    // Return true if similarity is 50% or higher
    return similarity >= 0.50;
}

module.exports = { calculateSkillMatch };
