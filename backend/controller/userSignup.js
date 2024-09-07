const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");



async function userSignUpController(req,res){
    try{
        console.log(req.body);
                
        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const age = req.body.age;
        const user = await userModel.findOne({email});
        
        if(user){
            console.log("user already exists");
            throw new Error ("User Already Exists");
        }
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!name){
            throw new Error("Please provide name")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password,salt);
        if(!hashPassword){
            throw new Error("Something is wrong");
        }
        const payload = {
            ...req.body,
            password : hashPassword
        }
        
        const userData = userModel(payload)
        const saveUser = await userData.save();
        res.status(201).json({
            data : saveUser,
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