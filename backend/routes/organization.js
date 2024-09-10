const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require("jsonwebtoken")
const bodyParser = require("body-parser");
const authToken = require("../middleware/authToken");
const organizationsignin = require("../controller/organization/organizationsignin");
const organizationsignup = require("../controller/organization/organizationsignup");
const acceptjobs = require("../controller/organization/acceptingjob");

router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post("/signup",organizationsignup);
router.post("/login",organizationsignin);
router.post("/acceptjob",acceptjobs);
// router.post("/forget-password", forgetPasswordController);
// router.post("/reset-password",resetPasswordController)


module.exports = router;