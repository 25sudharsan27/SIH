const bcrypt = require("bcryptjs");
const mcqModel = require("../../models/mcqModel")


async function userSignUpController (req,res){
    try{
        console.log(req.body);
                
        const data = req.body;

        const mcq = mcqModel(data);
        const datau = await mcq.save();

        res.status(201).json({
            data : datau,
            success:true,
            error:false,
            message : "User created Successfully"
        })
        
    }catch(error){
        console.log("error : ",error.message);
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = userSignUpController;