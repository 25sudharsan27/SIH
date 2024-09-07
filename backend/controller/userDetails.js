const userModel = require("../models/userModel");

async function userDetailsController(req,res){
    try{
        console.log("user id : ",req.user_id);
        
        const user = await userModel.findById(req.user_id);
        res.status(200).json({
            data : user,
            message : "working well ",
            error : false,
            success : true
        })
    }
    catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userDetailsController;