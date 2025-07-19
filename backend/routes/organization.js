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


router.patch("/addorganization",orgauthToken,upload.single('pic'),uploadImageExp,organizationController.updateOrganizationDetails);
router.patch("/updateabout",orgauthToken,organizationController.updateAboutOrganization);
router.post("/closejob",orgauthToken,organizationController.closeJobByOrganization);
router.get("/getclosedjobs",orgauthToken,organizationController.getClosedJobs);
router.get("/getopenjobs",orgauthToken,organizationController.getOpenJobs);
router.post("/addjob",orgauthToken,organizationController.AddJob);
router.get("/organizationdetails",orgauthToken,organizationController.organizationDetailsById);
router.post("/userdetails",orgauthToken,organizationController.userDetailsController);



router.post('/create',orgauthToken, organizationController.createJob);
router.get('/posted/:orgId',organizationController.getPostedJobs);
router.get('/details/:jobId', organizationController.getJobDetails);
router.get('/applicants/:jobId/:stage', organizationController.getApplicantsByStage);
router.post('/applicant/move', organizationController.moveApplicantToNextStage);
router.post('/applicants/bulk-update', organizationController.moveApplicantsBulk);
router.put('/applicant/status', organizationController.updateApplicantStatus);
router.put('/stages/:jobId', organizationController.updateJobStages);
router.put('/close/:jobId', organizationController.closeJob);

// Job seeker routes
router.get('/jobdetail/:job_id',orgauthToken, organizationController.getJobDetailById);
router.post('/apply', organizationController.applyToJob);
router.get('/my-applications/:userId', organizationController.getMyApplications);
router.get('/application-status/:jobId/:userId', organizationController.getApplicationStatus);
router.get('/jobapplicationstatuscount/:jobId', orgauthToken, organizationController.getCountofApplicationStatus);

module.exports = router;