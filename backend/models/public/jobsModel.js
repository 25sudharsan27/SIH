const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  skills: { type: [String], required: true }, // Array of skills
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  workMode: { type: String },
  experienceLevel: { type: String, required: true },
  company: { type: String },
  opening: { type: Number },
  extra_questions: { type: [String] }, // Array of extra questions
  status: { type: String },
  stipend: { type: Number } // Assuming stipend is a number
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
