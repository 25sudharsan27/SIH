const postModel =require("../models/posts");
const bcrypt = require("bcryptjs");
const mcqModel = require("../models/mcqModel")
const jobModel = require("../models/public/jobsModel");
const Post = require('../models/posts'); // Ensure you have the correct path to your model
const User = require("../models/userModel");
const Job = require("../models/public/jobsModel");
const mongoose = require("mongoose");


const addPost = async (req, res) => {
    try {
        const { description, title, image } = req.body;
        const user_id = req.user_id;

        if (!description || !title || !user_id) {
            return res.status(400).json({
                message: "Title, description, and user authentication are required",
                error: true,
                success: false
            });
        }

        const postData = new Post({
            description: description.trim(),
            title: title.trim(),
            user_id: user_id,
            image: image || null,
            like: 0,
            comment: []
        });

        const savedPost = await postData.save();
        
        res.status(201).json({
            data: savedPost,
            success: true,
            error: false,
            message: "Post created successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};



const getPostsData = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        console.log("hi is it comming here");

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('user_id', 'username email')
            .populate('comment.user_id', 'username')
            .lean();

        const totalPosts = await Post.countDocuments({ isActive: true });
        const totalPages = Math.ceil(totalPosts / limit);

        res.json({
            data: posts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalPosts: totalPosts,
                hasMore: page < totalPages
            },
            success: true,
            error: false
        });
        
    } catch (err) {
        res.status(500).json({ 
            error: 'Error fetching posts',
            message: err.message,
            success: false 
        });
    }
};

// Like/Unlike a post
const likePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user_id;
        console.log("User ID:", userId, "Post ID:", postId);

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                error: true,
                success: false
            });
        }

        const alreadyLiked = post.likedBy.includes(userId);
        
        if (alreadyLiked) {
            // Unlike the post
            return res.status(200).json({
                data: {
                    postId: postId,
                    likes: post.like,
                    isLiked: false
                },
                success: true,
                error: false,
                message: "Post not liked"
            });
        } else {
            // Like the post
            post.like += 1;
            post.likedBy.push(userId);
        }

        await post.save();
        
        res.json({
            data: {
                postId: postId,
                likes: post.like,
                isLiked: !alreadyLiked
            },
            success: true,
            error: false,
            message: alreadyLiked ? "Post unliked" : "Post liked"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

const addComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text, parentCommentId } = req.body;
        const userId = req.user_id;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment text is required",
                error: true,
                success: false
            });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                error: true,
                success: false
            });
        }

        const newComment = {
            user_id: userId,
            text: text.trim(),
            parentCommentId: parentCommentId || null,
            replies: [],
            likes: 0,
            likedBy: [],
            createdAt: new Date(),
            _id: new mongoose.Types.ObjectId() // Ensure each comment has a unique ID
        };

        if (parentCommentId) {
            const findCommentById = (comments, id) => {
              for (const comment of comments) {
                if (comment._id.toString() == id.toString()) return comment;
                if (comment.replies && comment.replies.length > 0) {
                  const result = findCommentById(comment.replies, id);
                  if (result) return result;
                }
              }
              return null;
            };

            const parentComment = findCommentById(post.comment, parentCommentId);
            console.log("Parent Comment:", parentComment);
            parentComment.replies.push(newComment);
        } else {
            post.comment.push(newComment);
        }

        post.markModified('comment');

        await post.save();

        const savedComment = newComment;

        res.status(201).json({
            data: savedComment,
            success: true,
            error: false,
            message: "Comment added successfully"
        });

    } catch (error) {
      console.error("Error adding comment:", error);
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

// Get comments for a specific post
const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
            .populate('comment.user_id', 'username')
            .select('comment');

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                error: true,
                success: false
            });
        }

        res.json({
            data: post.comment,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

// Delete a post (soft delete)
const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user_id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                error: true,
                success: false
            });
        }

        // Check if user owns the post
        if (post.user_id.toString() !== userId) {
            return res.status(403).json({
                message: "You can only delete your own posts",
                error: true,
                success: false
            });
        }

        post.isActive = false;
        await post.save();

        res.json({
            message: "Post deleted successfully",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

// Search posts
const searchPosts = async (req, res) => {
    try {
        const { query, page = 1, limit = 5 } = req.query;
        const skip = (page - 1) * limit;

        if (!query || !query.trim()) {
            return res.status(400).json({
                message: "Search query is required",
                error: true,
                success: false
            });
        }

        const searchRegex = new RegExp(query.trim(), 'i');
        
        const posts = await Post.find({
            isActive: true,
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { tags: { $in: [searchRegex] } }
            ]
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .populate('user_id', 'username email')
        .lean();

        const totalPosts = await Post.countDocuments({
            isActive: true,
            $or: [
                { title: searchRegex },
                { description: searchRegex },
                { tags: { $in: [searchRegex] } }
            ]
        });

        res.json({
            data: posts,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalPosts / limit),
                totalPosts: totalPosts,
                hasMore: page < Math.ceil(totalPosts / limit)
            },
            success: true,
            error: false
        });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal server error",
            error: true,
            success: false
        });
    }
};



const getcountries = async(req,res)=>{
  try{
    const countries = await jobModel.distinct("country"); 
    res.status(200).json({
      data: countries,
      message: "Countries retrieved successfully",
      error: false,
      success: true
    });
  } 
  catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
}
const getstates = async(req,res)=>{
  try{
    const { country } = req.body; 
    if (!country) {
      const states = await jobModel.distinct("state"); 
      return res.status(200).json({
        data: states,
        message: "States retrieved successfully",
        error: false,
        success: true
      })
    }
    else{
      const states = await jobModel.distinct("state", { country }); 
      res.status(200).json({
        data: states,
        message: "States retrieved successfully",
        error: false,
        success: true
      });
  }

  }catch(error){
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

const getcities = async(req,res)=>{
  try{
    const { country,state } = req.body; 
    if (!country && !state) {
      const states = await jobModel.distinct("city"); 
      return res.status(200).json({
        data: states,
        message: "Cities retrieved successfully",
        error: false,
        success: true
      })
    }
    else if(!country){
      const states = await jobModel.distinct("city", { state }); 
      return res.status(200).json({
        data: states,
        message: "Cities retrieved successfully",
        error: false,
        success: true
      })
    }
    else if(!state){
      const states = await jobModel.distinct("city", { country });
      return res.status(200).json({
        data: states,
        message: "Cities retrieved successfully",
        error: false,
        success: true
      });
    }
    else{
      const states = await jobModel.distinct("state", { country,state }); 
      res.status(200).json({
        data: states,
        message: "States retrieved successfully",
        error: false,
        success: true
      });
  }

  }catch(error){
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}

const filterJobDetails = async (req, res) => {
  try {
    const { experienceLevel, search } = req.body;

    const filter = {};
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    if (search) {
      filter.title = { $regex: search, $options: "i" }; 
    }

    const jobs = await jobModel.find(filter).lean();

    res.status(200).json({
      data: jobs,
      message: "Jobs retrieved successfully",
      error: false,
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};



const getMcqTests = async (req, res) => {
    try {  
      const data = await  mcqModel.find({})

      res.status(200).json({
        data: data,
        message: "mcq test data recieved",
        error: false,
        success: true
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
      });
    }
};
  

const getMcqTestById = async (req, res) => {
    try {
      const {id} = req.params;
  
      const data = await  mcqModel.findOne({"_id":id})
      
      if (!data) {
        return res.status(404).json({
          message: "MCQ test not found",
          error: true,
          success: false
        });
      }
  
  
      res.json({
        data: data,
        message: "mcq test data recieved",
        error: false,
        success: true
      });
    } catch (err) {
      res.status(500).json({
        message: err.message || err,
        error: true,
        success: false
      });
    }
  };
  
const jobDetailsById = async (req, res) => {
    try {
        const jobId = req.body.job_id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                error: true,
                success: false
            });
        }
        const job = await jobModel.findOne({ _id: jobId, status: "open" }).lean();
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: job,
            message: "Job found",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


const getPeoplesData = async (req, res) => {
    try {
        const { query = '', page = 1 } = req.body; 

        const filter = { name: { $regex: `^${query}`, $options: 'i' } };

        const usersPerPage = 6;
        const skipCount = (page - 1) * usersPerPage;

        const result = await User.aggregate([
            {
                $match: filter,  
            },
            {
                $facet: {
                    totalCount: [{ $count: "count" }],  
                    users: [{ $skip: skipCount }, { $limit: usersPerPage }]  
                }
            }
        ]);

        const totalUsers = result[0]?.totalCount[0]?.count || 0;
        const totalPages = Math.ceil(totalUsers / usersPerPage); 

        res.status(200).json({
            totalPages,
            error: false,
            data: result[0]?.users || []
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};




const getJobDetailsByFilter = async (req, res) => {
  try {
    const { query, page = 1, experience,country,city,state } = req.body; 

    const filter = { status: "open" };
    if (query) {
      filter.title = { $regex: query, $options: 'i' }; 
    }
    if (experience) {
      filter.experienceLevel = { $regex: experience, $options: 'i' }; 
    }
    if (country) {
      filter.country = { $regex: country, $options: 'i' };
    }
    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }
    if (state) {
      filter.state = { $regex: state, $options: 'i' };
    }


    const totalJobs = await jobModel.countDocuments(filter);

    const jobsPerPage = 6;
    const jobs = await jobModel.aggregate([
      {
        $match: filter 
      },
      {
        $sort: { createdAt: -1 } 
      },
      {
        $skip: (page - 1) * jobsPerPage
      },
      {
        $limit: jobsPerPage
      },
      {
        $lookup: {
          from: "organizations",
          localField: "user_id",
          foreignField: "_id",
          as: "orgInfo"
        }
      },
      {
        $unwind: "$orgInfo"
      },
      {
        $project: {
          title: 1,
          experienceLevel: 1,
          workMode: 1,
          country: 1,
          city: 1,
          state: 1,
          stipend: 1,
          company: "$orgInfo.companyname",
          pic: "$orgInfo.pic",
        }
      }
    ]);
         

    const totalPages = Math.ceil(totalJobs / jobsPerPage);

    res.status(200).json({
      totalPages,
      data: jobs,
      message: "working well",
      error: false,
      success: true
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false
    });
  }
};

const getProfileDataById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.find({_id : id});
        if (!user || user.length === 0) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            });
        }
        res.json({
            "error":false,
            "data" :user    
        });
    } catch (err) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};


const getJobDetailById = async (req,res) => {
    try{
        const {job_id} = req.params;
        if(!job_id){
            return res.status(400).json({
                message : "job_id is required",
                error : true,
                success : false
            })
        }
        const job = await jobModel.findOne({"_id" : job_id}); 

        if(!job){
            return res.status(404).json({
                message : "job not found",
                error : true,
                success : false
            })
        }
        res.status(200).json({
            data : job,
            message : "job data ",
            error : false,
            success : true
        }) 
    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

const getActiveJobById = async (req, res) => {
    try {
        const jobId = req.body.job_id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                error: true,
                success: false
            });
        }
        const job = await jobModel.findOne({ _id: jobId, status: "open" }).lean();
        
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            data: job,
            message: "Job found",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


const addOrUpdateJob = async (req, res) => {
  try {
    const { userId, title, description, link, experienceLevel, workMode, country, city, location, company, opening, skills,requirements,benefits,responsibilities } = req.body;
    
    if (!userId || !title || !experienceLevel || !workMode) {
      return res.status(400).json({
        message: "userId, title, experienceLevel, and workMode are required",
        error: true,
        success: false
      });
    }
    let job;

    User = await User.findById(userId);
    if(!User){
      res.status(404).json({
        message: "User not found",
        error: true,
        success: false
      });
    }
    if(User.jobseeker === false){
      res.status(403).json({
        message: "User is not a jobseeker",
        error: true,
        success: false
      });
    }
    
    job = await Job.findOneAndUpdate(
        { title : title, user_id: userId },
        {
          title,
          description,
          link,
          experienceLevel,
          workMode,
          country,
          city,
          location,
          company,
          opening,
          requirements,benefits,responsibilities,
          skills: Array.isArray(skills) ? skills : [skills], // If skills are provided as a string, convert to an array
        },
        { new: true, runValidators: true }
      );

      if (!job) {
        job = new Job({
          user_id: userId,
          title,
          description,
          link,
          experienceLevel,
          workMode,
          country,
          city,
          location,
          company,
          opening,
          requirements,benefits,responsibilities,
          skills: Array.isArray(skills) ? skills : [skills], // If skills are provided as a string, convert to an array
        });
      }
      const savedJob = await job.save();

      res.status(201).json({
        message: "Job added successfully",
        success: true,
        data: savedJob,
      });
      

  } catch (error) {
    res.status(400).json({
      message: error.message || "Error adding or updating job",
      error: true,
      success: false,
    });
  }
};



module.exports = {
    getcountries,
    getstates,
    getcities,
    filterJobDetails,
    getMcqTests,
    getMcqTestById,
    jobDetailsById,
    getPeoplesData,
    getPostsData,
    getActiveJobById,
    getJobDetailsByFilter,
    getProfileDataById,
    getJobDetailById,
    addOrUpdateJob,
    addPost,
    getPostsData,
    likePost,
    addComment,
    getComments,
    deletePost,
    searchPosts
}