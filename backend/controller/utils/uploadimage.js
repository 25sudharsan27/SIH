const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'duyuxtpau',  
    api_key: '521557337532656',  
    api_secret: 'EPtKwTFYbMqq6Zb7Fz_Y9sUSshk'  
  });
  
  

const uploadImageExp = async (req, res, next) => {
    const { file } = req; 
    console.log("Uploaded file:", file); 
    const { pic } = req.body;
    console.log("picture "+pic);
    if (file) {
        try {
            console.log("Uploading image to Cloudinary...");
            const stream = cloudinary.uploader.upload_stream(
                {
                    resource_type: 'auto', 
                    public_id: `profilepics/${Date.now()}`, 
                    folder: 'user_profiles',
                    format: 'webp', 
                    transformation: [{ width: 800, height: 800, crop: 'fill' }] 
                    
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        return res.status(500).json({ error: "Error uploading image to Cloudinary" });
                    }

                    req.body.pic = result.secure_url;
                    next();
                }
            );
            stream.end(file.buffer); 
        } catch (error) {
            console.error("Error in image upload:", error);
            return res.status(500).json({ error: "Error in image upload" });
        }
    } else {
        next();
    }
};


module.exports = uploadImageExp;