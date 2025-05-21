const express = require("express")

const router = express.Router();

const authToken = require("../middleware/verifyuserToken");
const jobdetails = require("../controller/public/jobDetails");
const updatejob = require("../controller/public/updateJob");
const filterjobdetails = require("../controller/public/filterJobDetails");
const viewJob = require("../controller/public/singleJobDetails");
const addmcqtest = require("../controller/public/addMcqTest")
const getmcqtest = require("../controller/public/getMcqtest");
const getdata = require("../controller/public/getMcq");
const AddPost = require("../controller/public/addPost");
const getpost = require("../controller/public/getPost");
const userAuth = require("../middleware/verifyuserToken");

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