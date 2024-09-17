const organizationModel = require("../../models/organizationModel");

async function userDetailsController(req,res){
    try{
        console.log("user id : ",req.user_id);
        
        const org = await organizationModel.findById(req.user_id);
        res.status(200).json({
            data : org,
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