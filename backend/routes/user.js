const express = require("express")
const router = express.Router();


const authToken = require("../middleware/verifyuserToken")
const uploadImageExp = require("../controller/utils/uploadimage.js");
const userController = require("../controller/user.controller.js");


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/signup",userController.userSignUpController);
router.post("/login",userController.userSignInController);
router.get("/logout",userController.userLogout);

router.post("/adddetails", authToken, upload.single('pic'), uploadImageExp, userController.updateUserDetails);


router.post("/addeducation", authToken, upload.single('pic'), uploadImageExp, userController.addEducation);
router.post("/updateeducation", authToken, upload.single('pic'), uploadImageExp, userController.updateEducation);
router.post("/deleteeducation", authToken,upload.none(), userController.deleteEducation);

router.post("/addexperience", authToken, upload.single('pic'), uploadImageExp, userController.addExperience);
router.post("/updateexperience", authToken, upload.single('pic'), uploadImageExp, userController.updateExperience);
router.post("/deleteexperience", authToken, upload.none(), userController.deleteExperience);

router.post("/newtestingroute",authToken ,(req,res)=>{
    console.log("testing route");
    console.log(req.body);
    console.log(req.user_id);
    res.status(200).json({
        message: "success",
        data : [],
        error : false,
        success : true
    })
})

router.post("/delete",authToken,userController.deleteUserDetails);
router.post("/applytojob",authToken,userController.applyToJob);
router.post("/userdetails",authToken,userController.userDetailsController);
router.post("/suggestedjob",authToken,userController.SuggestJob);


module.exports = router;