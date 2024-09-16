const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String }, 
  hashtags: [{ type: String }], 
  mentions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
