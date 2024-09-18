const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    TestName : String,
    questions :[
        {
            text : String,
            options :[String],
            answer :String
        }
    ]
    // Assuming stipend is a number
});

const Job = mongoose.model('MCQ', jobSchema);

module.exports = Job;
