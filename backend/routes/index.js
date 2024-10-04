const express = require("express")

const router = express.Router();
const cookieparser = require('cookie-parser');
const jsonwebtokens = require

const userSignUpController = require("../controller/userSignup")
const userSignInController = require("../controller/userSignin");
const bodyParser = require("body-parser");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userLogout");
const forgetPasswordController = require("../controller/forgetPassword");
const resetPasswordController = require("../controller/resetPassword");
router.use(cookieparser());
router.use(bodyParser.json());
router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post("/login",userSignInController);
router.post("/signup",userSignUpController)
// router.get("/user-details",authToken,userDetailsController);
router.get("/logout",userLogout);
router.post("/forget-password",forgetPasswordController);

// router.post("/forget-password", forgetPasswordController);
// router.post("/reset-password",resetPasswordController)


module.exports = router;