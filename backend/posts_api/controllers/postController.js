const Post = require('../models/Post');
const { uploadToCloudinary } = require('../services/cloudinaryService');


exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const file = req.file;
    let mediaUrl = '';


    if (file) {
      mediaUrl = await uploadToCloudinary(file);
    }

    const hashtags = content.match(/#[\w]+/g) || [];


    const mentions = req.body.mentions || [];

    const post = new Post({
      user: req.user.id,
      content,
      mediaUrl,
      hashtags,
      mentions
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
};


exports.searchPosts = async (req, res) => {
  const query = req.query.q;
  try {
    const posts = await Post.find({
      $or: [
        { content: { $regex: query, $options: 'i' } },
        { hashtags: query }
      ]
    }).populate('user');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error searching posts' });
  }
};
