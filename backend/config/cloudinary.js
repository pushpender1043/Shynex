const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadOnCloudinary=async(filePath)=>{
     cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret:  process.env.CLOUDINARY_API_SECRET
     });
    
     try{
         if(!filePath){
        return null
     }
     
     const uploadResult = await cloudinary.uploader.upload(filePath)
   //   fs.unlinkSync(filePath)
      if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // delete local file
    }
     return uploadResult.secure_url

     }
     catch(error){
   //   fs.unlinkSync(filePath)
      if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // delete local file
    }
     console.log(error)


     }

}

module.exports = { uploadOnCloudinary }