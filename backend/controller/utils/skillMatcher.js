


const calculateSkillMatch = async (userSkills, jobSkills) => {
    const jobSkillVector = new Array(jobSkills.length).fill(0);
    let similarity = 0;

    for (let i = 0; i < jobSkills.length; i++) {
        if (userSkills.includes(jobSkills[i])) {
            jobSkillVector[i] = 1;
            similarity += 1;
        }
    }

    similarity = similarity / jobSkills.length;

    return similarity >= 0.50;
}

module.exports = { calculateSkillMatch };
