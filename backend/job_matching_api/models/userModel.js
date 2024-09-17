const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: [String],
});

module.exports = mongoose.model('User', userSchema);
