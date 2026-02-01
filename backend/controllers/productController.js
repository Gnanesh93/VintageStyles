import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import orderModel from "../models/orderModel.js"

const addProduct=async(req,res)=>{
    try {
       const{name,description,price,category,subCategory,productType,sizes,bestseller}=req.body;
       const image1=req.files.image1 && req.files.image1[0]
       const image2=req.files.image2 && req.files.image2[0]
       const image3=req.files.image3 && req.files.image3[0]
       const image4=req.files.image4 && req.files.image4[0]

       const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

       let imagesUrl=await  Promise.all(
        images.map(async(item)=>{
            let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url;
        })
       )
       const productData={
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        productType,
        bestseller:bestseller==="true"? true:false,
        sizes:JSON.parse(sizes),
        image:imagesUrl,
        date:Date.now()
       }

       const product=new productModel(productData);
       await product.save()
       res.json({success:true,message:"Product Added"})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const listProducts=async(req,res)=>{
    try {
      const products=await productModel.find({}) ;
      res.json({success:true,products})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const removeProduct=async(req,res)=>{
    try {
      await productModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"product removed"})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const singleProduct=async(req,res)=>{
    try {
        const{productId}=req.body
        const product=await productModel.findById(productId)
        res.json({success:true,product})
    } 
    catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    } 
}

// Add Product Reviews
const addProductReview=async(req,res)=>{
  try{
    const product = await productModel.findById(req.params.id);
    const {rating,comment} = req.body;

    const order = await orderModel.findOne({userId: req.userId,status: "Delivered","items._id": req.params.id});

    if (!order){
      return res.json({success:false, message:"Not eligible to review" });
    }

    const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.userId);

    if (alreadyReviewed){
      return res.json({success:false, message: "Already reviewed"});
    }

    const images = req.files?.map(file =>file.path) || [];

    product.reviews.push({
      user: req.userId,
      name: req.userName,
      rating: Number(rating),
      comment,
      images
    });

    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0)/product.numReviews;

    await product.save();
    res.json({success:true });
  } 
  catch (err) {
    res.json({ success:false, message: err.message });
  }
};


export{addProduct,removeProduct,singleProduct,listProducts,addProductReview}