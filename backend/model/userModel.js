const {Schema,model}=require('mongoose');
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
        default:{}
    }
},{timestamps:true,minimize:false})


const User=model("User",userSchema);

module.exports=User;
