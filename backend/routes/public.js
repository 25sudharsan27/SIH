const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require("jsonwebtoken")
const bodyParser = require("body-parser");
const authToken = require("../middleware/authToken");
const jobdetails = require("../controller/public/jobdetails");
const updatejob = require("../controller/public/updatejob");

router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));


router.get("/jobs",jobdetails);
router.post("/updatejob",updatejob);

// router.post("/forget-password", forgetPasswordController);
// router.post("/reset-password",resetPasswordController)


module.exports = router;