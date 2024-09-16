const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require('jsonwebtoken')

const userSignUpController = require("../controller/userSignup")
const userSignInController = require("../controller/userSignin");
const bodyParser = require("body-parser");
const userDetailsController = require("../controller/userDetails");
const adduserdetails = require("../controller/profile/adduserdetails");
const authToken = require("../middleware/authToken");
const deleteUserDetails = require("../controller/profile/deleteuserdetails");
const applytojob = require("../controller/profile/applytojob");
const UserDetails = require('../controller/userDetails')

router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post("/adddetails",authToken,adduserdetails);
router.post("/delete",authToken,deleteUserDetails);
router.post("/applytojob",authToken,applytojob)
router.post("/userdetails",authToken,UserDetails)


module.exports = router;