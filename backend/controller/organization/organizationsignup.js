const organizationModel = require("../../models/organizationModel");
const bcrypt = require("bcryptjs");



async function OrganizationSignUpController(req,res){
    try{
        console.log(req.body);
                
        const email = req.body.email;
        const companyname = req.body.companyname;
        const password = req.body.password;
        const logo = req.body.logo;
        const about = req.body.about;
        const location = req.body.location;
        const organization = await organizationModel.findOne({companyname,email});
        
        
        
        if(organization){
            console.log("organization already exists");
            throw new Error ("User Already Exists");
        }
        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
            throw new Error("Please provide password")
        }
        if(!companyname){
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
        
        const userData = organizationModel(payload)
        const saveUser = await userData.save();
        res.status(201).json({
            data : saveUser,
            success:true,
            error:false,
            message : "Organization created Successfully"
        })
        
    }catch(error){
        console.log("error : ",error.message);
        console.log("pinpili");
        res.json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

module.exports = OrganizationSignUpController;