const express = require("express")
const router = express.Router();
const userSignUpController = require("../controller/user/userSignup")
const userSignInController = require("../controller/user/userSignin");
const userLogout = require("../controller/user/userLogout");

router.post("/login",userSignInController);
router.post("/signup",userSignUpController)
router.get("/logout",userLogout);


module.exports = router;