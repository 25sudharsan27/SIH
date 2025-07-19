const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true,
        maxlength: 500
    },
    parentCommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },
    replies: [this],
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },
    image: {
        type: String,
        default: null,
        validate: {
            validator: function(v) {
                if (!v) return true;
                try {
                    new URL(v);
                    return true;
                } catch {
                    return false;
                }
            },
            message: 'Invalid image URL'
        }
    },
    like: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comment: [commentSchema],
    tags: [{
        type: String,
        trim: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

postSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

postSchema.index({ user_id: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ isActive: 1 });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;