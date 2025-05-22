const express = require("express")

const router = express.Router();

const authToken = require("../middleware/verifyuserToken");
const publicController = require("../controller/public.controller.js");


router.post("/jobs",authToken,publicController.getJobDetailsByFilter);
router.post("/updatejob",publicController.addOrUpdateJob);
router.post("/filterjobs",publicController.filterJobDetails);
router.post("/viewjob",publicController.getJobDetailById);
router.post("/getmcq",publicController.getMcqTestById);
router.post("/getdata",publicController.getMcqTests);
router.post("/addpost",authToken,publicController.AddPost);
router.post("/getpost",publicController.getPostsData);
router.post("/getmyjobs",authToken,publicController.getActiveJobById);
router.post("/getprofdata",publicController.getProfileDataById);
router.post("/getprofdatas",publicController.getPeoplesData);

module.exports = router;