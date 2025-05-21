const jwt = require("jsonwebtoken");

 

async function authToken(req,res,next){
    try{

        const token =  req.cookies?.token;
        if(req.body.user_id){
            req.user_id = req.body.user_id;
            return next();
        }
        // console.log(token);
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
                // console.log(err);
                // console.log("decoded : ",decoded, "\n id ",decoded?._id);
                if(err){
                    console.log("error auth",err);
                }
                req.user_id = decoded?._id;
                // console.log("user id : ",req.user_id);
                next();
            }
        )
        // console.log("token  : ",token)
        
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