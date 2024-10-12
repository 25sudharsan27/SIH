import userModel from '../../models/userModel.js';




const UserDetails = async(req,res)=>{
    try{
        const user = await userModel.find([{"_id" : req.body.user_id}]);
        if(!user){
            throw new Error("User not found");
        }
        res.json({
            data : user,
            message : "User details found",
            error : false,
            success : true
        })
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

module.exports = UserDetails;