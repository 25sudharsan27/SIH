const Comment = require('../models/Comment');


exports.replyToComment = async (req, res) => {
  try {
    const parentComment = await Comment.findById(req.params.id);
    if (!parentComment) return res.status(404).json({ message: 'Comment not found' });

    const reply = new Comment({
      post: parentComment.post,
      user: req.user.id,
      content: req.body.content
    });

    parentComment.replies.push(reply._id);
    await reply.save();
    await parentComment.save();

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Error replying to comment' });
  }
};


exports.likeComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.likes.includes(req.user.id)) {
      comment.likes.pull(req.user.id);
    } else {
      comment.likes.push(req.user.id);
    }

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error liking comment' });
  }
};
