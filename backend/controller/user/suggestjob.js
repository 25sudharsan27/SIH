const userModel = require("../../models/userModel");
const jobModel = require("../../models/public/jobsModel");
const { calculateSkillMatch } = require("./utils/skillMatcher");

const SuggestJob = async (req, res) => {
    try {
        const user_id = req.user_id;
        console.log("sudharsan "+user_id);
        const { page } = req.body;
        // Fetch the user data
        const user = await userModel.findById(user_id);
        

        if (!user) {
            throw new Error("User not found");
        }

        const userSkills = user.skills;

        // Fetch all job postings
        const jobs = await jobModel.find({});
        console.log(jobs);
        // Filter jobs based on skill matching
        var matchingJobs = jobs.filter(job =>  calculateSkillMatch(userSkills, job.skills)); // Ensure `job.skills` matches the skill array
        const totalPages = Math.ceil(matchingJobs.length/6);
        // Return the matching jobs

        if(page){
            const start = (page-1)*6;
            const end = page*6;
            matchingJobs = matchingJobs.slice(start,(end>matchingJobs.length)?matchingJobs.length:end); 
        }



        res.json({
            totalPages: totalPages,
            success: true,
            data: matchingJobs,
        });
    } catch (err) {
        res.status(500).json({ // Use 500 for server errors
            success: false,
            message: err.message,
        });
    }
};

module.exports = SuggestJob;
