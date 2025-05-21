const express = require("express")

const router = express.Router();
const authToken = require("../middleware/verifyuserToken")

const adduserdetails = require("../controller/user/adduserdetails.js");
const deleteUserDetails = require("../controller/user/deleteuserdetails.js");
const applytojob = require("../controller/user/applytojob.js");
const UserDetails = require('../controller/user/userDetails.js')
const SuggestedJob = require("../controller/user/suggestjob.js")
const multer = require('multer');
const adduserexperience = require("../controller/user/addexperience.js");
const addusereducation = require("../controller/user/addeducation.js");
const uploadImageExp = require("../service/uploadimage.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





router.post("/adddetails", authToken, upload.single('pic'), uploadImageExp, adduserdetails);
router.post("/addexperiences", authToken, upload.single('pic'), uploadImageExp, adduserexperience);
router.post("/addeducation", authToken, upload.single('pic'), uploadImageExp, addusereducation);
router.post("/delete",authToken,deleteUserDetails);
router.post("/applytojob",authToken,applytojob)
router.post("/userdetails",authToken,UserDetails)
router.post("/suggestedjob",authToken,SuggestedJob);


module.exports = router;