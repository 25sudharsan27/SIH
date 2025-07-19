const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    link: String,
    experienceLevel: {
      type: String, 
      required: true,
    },
    workMode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    company: String,
    pic: String,
    opening: {
      type: Number,
      default: 1,
    },
    skills: [String],
    extra_questions: [String],
    
    // Updated application stages structure
    application_stages: [{
      stage_name: {
        type: String,
        required: true,
        // e.g., "CV Screening", "Online Test", "Technical Interview", "HR Round", "Final Decision"
      },
      stage_order: {
        type: Number,
        required: true,
      },
      stage_description: String,
      is_active: {
        type: Boolean,
        default: true,
      }
    }],
    
    applicants: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        extra_questions: [{
          question: String,
          answer: String
        }],
        resume: String,
        skills: [{
          skill: String,
          match: Boolean
        }],
        current_stage: {
          type: Number,
          default: 0, // Index of current stage in application_stages array
        },
        stage_history: [{
          stage_name: String,
          stage_order: Number,
          status: {
            type: String,
            enum: ['pending', 'passed', 'failed', 'in_progress'],
            default: 'pending'
          },
          comments: String,
          updated_at: {
            type: Date,
            default: Date.now
          },
          updated_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
          }
        }],
        overall_status: {
          type: String,
          enum: ['applied', 'in_progress', 'selected', 'rejected'],
          default: 'applied'
        },
        applied_at: {
          type: Date,
          default: Date.now
        }
      },
    ],
    
    status: {
      type: String,
      default: "open"
    },
    stipend: Number,
    requirements: { type: String },
    benefits: { type: String },
    responsibilities: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", jobSchema);