const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    user_id : mongoose.Schema.Types.ObjectId,
    description : String,
    like : Number,
    comment : [
        {
            user_id : mongoose.Schema.Types.ObjectId,
            text : String,
        }
    ],
    title : String 
});

const post = mongoose.model('Post', jobSchema);

module.exports = post;
