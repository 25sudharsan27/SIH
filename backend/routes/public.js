const express = require("express")

const router = express.Router();

const authToken = require("../middleware/verifyuserToken");
const publicController = require("../controller/public.controller.js");


router.post("/updatejob",publicController.addOrUpdateJob);
router.post("/filterjobs",publicController.filterJobDetails);
router.get("/viewjob/:job_id",publicController.getJobDetailById);

router.get("/getmcq/:id",publicController.getMcqTestById);
router.get("/getdata",publicController.getMcqTests);
router.post("/getpost",publicController.getPostsData);
router.get("/getprofdata/:id",publicController.getProfileDataById);
router.post("/getprofdatas",publicController.getPeoplesData);

router.post("/addpost",authToken,publicController.addPost);
router.post("/getmyjobs",authToken,publicController.getActiveJobById);
router.post("/jobs",authToken,publicController.getJobDetailsByFilter);

router.post("/getcountries", publicController.getcountries);
router.post("/getstates", publicController.getstates);
router.post("/getcities", publicController.getcities);


router.get('/posts', publicController.getPostsData);
router.get('/posts/search', publicController.searchPosts);
router.get('/posts/:postId/comments', publicController.getComments);

// Protected routes (require authentication)
router.post('/posts', authToken, publicController.addPost);
router.post('/posts/like/:postId', authToken, publicController.likePost);
router.post('/posts/comments/:postId', authToken, publicController.addComment);
router.delete('/posts/:postId', authToken, publicController.deletePost);



// Additional utility routes
router.get('/posts/:postId', async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
            .populate('user_id', 'username email')
            .populate('comment.user_id', 'username');
            
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
                error: true,
                success: false
            });
        }
        
        res.json({
            data: post,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
});

// Get user's posts
router.get('/user/posts', authToken, async (req, res) => {
    try {
        const userId = req.user_id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const posts = await Post.find({ user_id: userId, isActive: true })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'username email');
            
        const totalPosts = await Post.countDocuments({ user_id: userId, isActive: true });
        
        res.json({
            data: posts,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts: totalPosts,
                hasMore: page < Math.ceil(totalPosts / limit)
            },
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
});

// Update post
router.put('/posts/:postId', authToken, async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, description, image } = req.body;
        const userId = req.user_id;
        
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
                error: true,
                success: false
            });
        }
        
        if (post.user_id.toString() !== userId) {
            return res.status(403).json({
                message: 'You can only update your own posts',
                error: true,
                success: false
            });
        }
        
        post.title = title || post.title;
        post.description = description || post.description;
        post.image = image || post.image;
        post.updatedAt = new Date();
        
        await post.save();
        
        res.json({
            data: post,
            success: true,
            error: false,
            message: 'Post updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
});

// Like/Unlike comment
router.post('/posts/:postId/comments/:commentId/like', authToken, async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const userId = req.user_id;
        
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found',
                error: true,
                success: false
            });
        }
        
        const comment = post.comment.id(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found',
                error: true,
                success: false
            });
        }
        
        const alreadyLiked = comment.likedBy.includes(userId);
        
        if (alreadyLiked) {
            comment.likes = Math.max(0, comment.likes - 1);
            comment.likedBy.pull(userId);
        } else {
            comment.likes += 1;
            comment.likedBy.push(userId);
        }
        
        await post.save();
        
        res.json({
            data: {
                commentId: commentId,
                likes: comment.likes,
                isLiked: !alreadyLiked
            },
            success: true,
            error: false,
            message: alreadyLiked ? 'Comment unliked' : 'Comment liked'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        });
    }
});

module.exports = router;
