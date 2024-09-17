const Job = require('../models/jobModel');
const User = require('../models/userModel');
const { calculateSkillMatch } = require('../utils/skillMatcher');

// Suggest jobs for a user based on a 75% match of skills
exports.suggestJobsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        
        // Get user skills
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userSkills = user.skills;

        const jobs = await Job.find({});
        const matchingJobs = jobs.filter(job => calculateSkillMatch(userSkills, job.requiredSkills));
        res.status(200).json(matchingJobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
