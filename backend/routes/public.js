const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require("jsonwebtoken")
const bodyParser = require("body-parser");
const authToken = require("../middleware/authToken");
const jobdetails = require("../controller/public/jobdetails");
const updatejob = require("../controller/public/updatejob");
const filterjobdetails = require("../controller/public/filterjobdetails");
const viewJob = require("../controller/public/singlejobdetails");
const addmcqtest = require("../controller/public/addmcqtest")
const getmcqtest = require("../controller/public/getmcqtest");
const getdata = require("../controller/public/getmcq");
const AddPost = require("../controller/public/addpost");
const getpost = require("../controller/public/getpost");
const userAuth = require("../middleware/authToken");

router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));


router.post("/jobs",authToken,jobdetails);
router.post("/updatejob",updatejob);
router.post("/filterjobs",filterjobdetails);
router.post("/viewjob",viewJob);
router.post("/addmcq",addmcqtest);
router.post("/getmcq",getmcqtest);
router.post("/getdata",getdata);
router.post("/addpost",userAuth,AddPost);
router.post("/getpost",getpost);
router.post("/getmyjobs",authToken,require("../controller/public/getmyjob"));
router.post("/getprofdata",require("../controller/public/profiledata"));
router.post("/getprofdatas",require("../controller/public/getpeopledata"));
// router.post("/forget-password", forgetPasswordController);
// router.post("/reset-password",resetPasswordController)



module.exports = router;