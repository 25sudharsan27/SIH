const express = require("express")

const router = express.Router();

const orgauthToken = require("../middleware/verifyOrgToken.js")
const multer = require('multer');
const uploadImageExp = require("../controller/utils/uploadimage.js");

const organizationController = require("../controller/organization.controller.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup",organizationController.organizationSignUp);
router.post("/login",organizationController.organizationSignIn);


router.post("/addorganization",orgauthToken,upload.single('pic'),uploadImageExp,organizationController.updateOrganizationDetails);
router.post("/closejob",orgauthToken,organizationController.closeJobByOrganization);
router.post("/getclosedjobs",orgauthToken,organizationController.getClosedJobs);
router.post("/getopenjobs",orgauthToken,organizationController.getOpenJobs);
router.post("/addjob",orgauthToken,organizationController.AddJob);
router.post("/organizationdetails",orgauthToken,organizationController.organizationDetailsById);

module.exports = router;