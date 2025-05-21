const express = require("express")

const router = express.Router();
const organizationsignin = require("../controller/organization/organizationsignin");
const organizationsignup = require("../controller/organization/organizationsignup");
const updateOrganizationDetails = require("../controller/organization/addorganizatoindetails.js");
const closejob = require("../controller/organization/closejob");
const getclosedjobs = require("../controller/organization/getclosedjobs");
const getopenjobs = require("../controller/organization/getopenjobs");
const AddJob = require("../controller/organization/addjob");
const OrganizationDetails = require("../controller/organization/organizationdetails")
const orgauthToken = require("../middleware/verifyOrgToken.js")
const multer = require('multer');
const uploadImageExp = require("../service/uploadimage.js");


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




// organaization authentication
router.post("/signup",organizationsignup);
router.post("/login",organizationsignin);


router.post("/addorganization",orgauthToken,upload.single('pic'),uploadImageExp,updateOrganizationDetails);
router.post("/closejob",orgauthToken,closejob);
router.post("/getclosedjobs",orgauthToken,getclosedjobs);
router.post("/getopenjobs",orgauthToken,getopenjobs);
router.post("/addjob",orgauthToken,AddJob);
router.post("/organizationdetails",orgauthToken,OrganizationDetails);


module.exports = router;