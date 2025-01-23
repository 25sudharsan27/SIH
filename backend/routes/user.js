const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require('jsonwebtoken')

const userSignUpController = require("../controller/userSignup")
const userSignInController = require("../controller/userSignin");
const bodyParser = require("body-parser");
const userDetailsController = require("../controller/userDetails");
const adduserdetails = require("../controller/profile/adduserdetails");
const authToken = require("../middleware/authToken");
const deleteUserDetails = require("../controller/profile/deleteuserdetails");
const applytojob = require("../controller/profile/applytojob");
const UserDetails = require('../controller/userDetails')
const SuggestedJob = require("../controller/profile/suggestjob")
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const adduserexperience = require("../controller/profile/addexperience");
const addusereducation = require("../controller/profile/addeducation");
router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

cloudinary.config({
  cloud_name: 'duyuxtpau',  // Replace with your Cloudinary cloud name
  api_key: '521557337532656',  // Replace with your Cloudinary API key
  api_secret: 'EPtKwTFYbMqq6Zb7Fz_Y9sUSshk'  // Replace with your Cloudinary API secret
});

const crypto = require('crypto'); // Import the crypto module to hash the user ID

const hashUserId = (userId) => {
    try {
        const hash = crypto.createHash('sha256'); // SHA-256 should be available in most versions
        hash.update(userId); // Provide the user ID to hash
        return hash.digest('hex'); // Return the hashed user ID as a hex string
    } catch (error) {
        console.error("Error hashing user ID:", error);
        throw error; // Throw error if hashing fails
    }
};

// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware for uploading the file to Cloudinary
const uploadImageIfPresent = async (req, res, next) => {
    // Access the uploaded file from multer
    const { file } = req; // Accessing the uploaded file from req.file
    console.log("Uploaded file:", file); // Log the file object for debugging
    const { profilepic } = req.body;
    console.log("profilepic", profilepic);

    if (file) {
        try {
            console.log("Uploading image to Cloudinary...");
            const hashedUserId = hashUserId(req.user_id);
            // Use the upload_stream method to upload a Buffer to Cloudinary
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', // Automatically detect the file type
                    public_id: `profilepics/${hashedUserId}`, // Optional: Set a custom public_id
                    folder: 'user_profiles', // Optional: Organize uploads in a folder
                    format: 'webp', // Force the image to be stored in WebP format
                    transformation: [{ width: 800, height: 800, crop: 'fill' }] // Optional: You can add transformations
                    
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return res.status(500).json({ error: "Error uploading image to Cloudinary" });
                    }

                    // Save the secure URL of the uploaded image to the request body
                    req.body.profilepic = result.secure_url;

                    // Proceed to the next middleware or route handler
                    next();
                }
            );

            // Pipe the file buffer into the Cloudinary upload stream
            stream.end(file.buffer); // End the stream with the buffer (this triggers the upload)
        } catch (error) {
            console.error("Error in image upload:", error);
            return res.status(500).json({ error: "Error in image upload" });
        }
    } else {
        next(); // If no file, continue to the next middleware
    }
};


const uploadImageExp = async (req, res, next) => {
    // Access the uploaded file from multer
    const { file } = req; // Accessing the uploaded file from req.file
    console.log("Uploaded file:", file); // Log the file object for debugging
    const { pic } = req.body;
    console.log("picture "+pic);
    if (file) {
        try {
            console.log("Uploading image to Cloudinary...");

            // Use the upload_stream method to upload a Buffer to Cloudinary
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', // Automatically detect the file type
                    public_id: `profilepics/${Date.now()}`, // Optional: Set a custom public_id
                    folder: 'user_profiles', // Optional: Organize uploads in a folder
                    format: 'webp', // Force the image to be stored in WebP format
                    transformation: [{ width: 800, height: 800, crop: 'fill' }] // Optional: You can add transformations
                    
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return res.status(500).json({ error: "Error uploading image to Cloudinary" });
                    }

                    // Save the secure URL of the uploaded image to the request body
                    req.body.pic = result.secure_url;

                    // Proceed to the next middleware or route handler
                    next();
                }
            );

            // Pipe the file buffer into the Cloudinary upload stream
            stream.end(file.buffer); // End the stream with the buffer (this triggers the upload)
        } catch (error) {
            console.error("Error in image upload:", error);
            return res.status(500).json({ error: "Error in image upload" });
        }
    } else {
        next(); // If no file, continue to the next middleware
    }
};





// Use the multer middleware to handle file upload
router.post("/adddetails", authToken, upload.single('profilepic'), uploadImageIfPresent, adduserdetails);
router.post("/addexperiences", authToken, upload.single('pic'), uploadImageExp, adduserexperience);
router.post("/addeducation", authToken, upload.single('pic'), uploadImageExp, addusereducation);
router.post("/delete",authToken,deleteUserDetails);
router.post("/applytojob",authToken,applytojob)
router.post("/userdetails",authToken,UserDetails)
router.post("/suggestedjob",authToken,SuggestedJob);


module.exports = router;