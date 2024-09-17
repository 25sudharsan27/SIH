const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: String,
    company: String,
    requiredSkills: [String], 
    description: String
});

module.exports = mongoose.model('Job', jobSchema);
