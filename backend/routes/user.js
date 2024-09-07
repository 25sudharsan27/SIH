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

router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post("/adddetails",adduserdetails);
router.post("/delete",deleteUserDetails);

module.exports = router;