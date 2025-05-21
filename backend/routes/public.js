const express = require("express")

const router = express.Router();

const authToken = require("../middleware/verifyuserToken");
const jobdetails = require("../controller/public/jobDetail.js");
const updatejob = require("../controller/public/updateJobs.js");
const filterjobdetails = require("../controller/public/filterJobDetail.js");
const viewJob = require("../controller/public/singleJobDetail.js");
const addmcqtest = require("../controller/public/addMcqTests.js")
const getmcqtest = require("../controller/public/getMcqtests.js");
const getdata = require("../controller/public/getMCQs.js");
const AddPost = require("../controller/public/adddPost.js");
const getpost = require("../controller/public/getPosts.js");
const userAuth = require("../middleware/verifyuserToken.js");

router.post("/jobs",authToken,jobdetails);
router.post("/updatejob",updatejob);
router.post("/filterjobs",filterjobdetails);
router.post("/viewjob",viewJob);
router.post("/addmcq",addmcqtest);
router.post("/getmcq",getmcqtest);
router.post("/getdata",getdata);
router.post("/addpost",userAuth,AddPost);
router.post("/getpost",getpost);
router.post("/getmyjobs",authToken,require("../controller/public/getMyJob"));
router.post("/getprofdata",require("../controller/public/profileData"));
router.post("/getprofdatas",require("../controller/public/getPeopleData"));

module.exports = router;