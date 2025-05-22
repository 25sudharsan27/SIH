const jwt = require("jsonwebtoken");

 

const authToken = async (req,res,next) => {
    try{

        const token =  req.cookies?.token;
        if(req.body.user_id){
            req.user_id = req.body.user_id;
            return next();
        }
        if(!token){
            console.log("token ",token);
            return res.status(400).json({
                message: "user not Logging",
                error : true,
                success : false
            })
        }
        jwt.verify(token,process.env.TOKEN_SECRET_KEY,
            function (err,decoded){
                if(err){
                    console.log("error auth",err);
                }
                console.log(req.body);
                req.user_id = decoded?._id;
                next();
            }
        )        
    }
    catch(err){
        res.status(400).json({
            message: err.message || err,
            data : [],
            error : true,
            success : false
        })
    }
}

module.exports = authToken