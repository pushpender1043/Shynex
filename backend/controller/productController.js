const express=require('express');
const { uploadOnCloudinary } = require('../config/cloudinary');
const Product = require('../model/productModel');

const addProduct=async(req,res)=>{
    try{
       let {name,description,price,category,subCategory,sizes,bestSeller}=req.body
       let image1=await uploadOnCloudinary(req.files.image1[0].path);
       let image2=await uploadOnCloudinary(req.files.image2[0].path);
       let image3=await uploadOnCloudinary(req.files.image3[0].path);
       let image4=await uploadOnCloudinary(req.files.image4[0].path);
       let productData={
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestSeller: bestSeller==="true"?true:false,
        date:Date.now(),
        image1,
        image2,
        image3,
        image4
        
       }
       const product=await  Product.create(productData)

       return res.status(200).json(product)


    }
    catch(error){


        console.log("Add Product Error")
         return res.status(500).json({message:`AddProduct error ${error}`})


    }


}

const listProduct=async(req,res)=>{
    try{
        const product=await Product.find({})
       return res.status(200).json(product)
    }
    catch(error){
         console.log("ListProduct Error")
         return res.status(500).json({message:`ListProduct error ${error}`})

    }

}

const removeProduct=async(req,res)=>{
    try{
        let {id}=req.params;
        const product=await Product.findByIdAndDelete(id);
       return res.status(200).json(product)


    }
    catch(error){
        console.log("removeProduct Error")
         return res.status(500).json({message:`removeProduct error ${error}`})


    }

}

module.exports={addProduct,listProduct,removeProduct}