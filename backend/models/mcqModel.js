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
});

const Job = mongoose.model('MCQ', jobSchema);

module.exports = Job;
