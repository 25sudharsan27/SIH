const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require("jsonwebtoken")
const bodyParser = require("body-parser");
const authToken = require("../middleware/authToken");
const organizationsignin = require("../controller/organization/organizationsignin");
const organizationsignup = require("../controller/organization/organizationsignup");
// const acceptjobs = require("../controller/organization/acceptingjob");
const updateOrganizationDetails = require("../controller/organization/addorganizatoindetails.js");
const closejob = require("../controller/organization/closejob");
const getclosedjobs = require("../controller/organization/getclosedjobs");
const getopenjobs = require("../controller/organization/getopenjobs");
const AddJob = require("../controller/organization/addjob");
const OrganizationDetails = require("../controller/organization/organizationdetails")
const orgauthToken = require("../middleware/orgauthToken")
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));


cloudinary.config({
  cloud_name: 'duyuxtpau',  // Replace with your Cloudinary cloud name
  api_key: '521557337532656',  // Replace with your Cloudinary API key
  api_secret: 'EPtKwTFYbMqq6Zb7Fz_Y9sUSshk'  // Replace with your Cloudinary API secret
});


// Set up storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


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






router.post("/signup",organizationsignup);
router.post("/login",organizationsignin);
router.post("/addorganization",orgauthToken,upload.single('pic'),uploadImageExp,updateOrganizationDetails);
router.post("/closejob",orgauthToken,closejob);
router.post("/getclosedjobs",orgauthToken,getclosedjobs);
router.post("/getopenjobs",orgauthToken,getopenjobs);
router.post("/addjob",orgauthToken,AddJob);
router.post("/organizationdetails",orgauthToken,OrganizationDetails);

// router.post("/acceptjob",acceptjobs);
// router.post("/forget-password", forgetPasswordController);
// router.post("/reset-password",resetPasswordController)


module.exports = router;