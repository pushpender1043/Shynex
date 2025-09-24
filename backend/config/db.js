const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db Connected!");
    }
    catch(err){
        console.log("Db Error!");
    }
}

module.exports= connectDb