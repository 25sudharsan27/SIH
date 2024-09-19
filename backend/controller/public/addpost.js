const postModel =require("../../models/posts");


async function AddPost(req,res){
    try{        
        const description = req.body.description;
        const title = req.body.title;
        const user_id = req.user_id;

        const postdata = postModel({
            description : description,
            title : title,
            user_id : user_id
        })

        const data = postdata.save();
    
        res.status(201).json({
            data : data,
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

module.exports = AddPost;