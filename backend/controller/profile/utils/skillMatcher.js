function calculateSkillMatch(userSkills, jobSkills) {
    const totalSkills = [...new Set([...userSkills, ...jobSkills])];
    const userSkillVector = totalSkills.map(skill => userSkills.includes(skill) ? 1 : 0);
    const jobSkillVector = totalSkills.map(skill => jobSkills.includes(skill) ? 1 : 0);

    const dotProduct = userSkillVector.reduce((acc, val, index) => acc + val * jobSkillVector[index], 0);
    const userMagnitude = Math.sqrt(userSkillVector.reduce((acc, val) => acc + val * val, 0));
    const jobMagnitude = Math.sqrt(jobSkillVector.reduce((acc, val) => acc + val * val, 0));

    const similarity = dotProduct / (userMagnitude * jobMagnitude);

    return similarity >= 0.75; 
}

module.exports = { calculateSkillMatch };
