const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


async function userSignInController(req,res){
    try{
        console.log("checking");
        console.log(req.body);
        const email = req.body.email;
        const password = req.body.password;
        if(!email){
            throw new Error("Please provide Email");
        }
        if(!password){
            throw new Error("Please provide a password");
        }
        const user = await userModel.findOne({email});
        if(!user){
            throw new Error("User Not found");
        }
        const checkpassword = await bcrypt.compare(password,user.password);
        console.log(`checkPassword = ${checkpassword}`);
        if(checkpassword){
            const tokenData = {
                "_id" : user.id,
                "emaill" : user.email
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn : 60 * 60 * 8});
            
            const tokenOption = {
                httpOnly : true,
                secure : true,
                sameSite : "None"
            }
            res.cookie("token",token,tokenOption).status(200).json({
                data : token,
                message : "User Password is correct",
                error : false,
                success : true
            })
        }
        else{
            throw new Error("User Password is Incorrect");
        }
    }
    catch(error){
        console.log("error : ",error.message);
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }

}

module.exports = userSignInController;