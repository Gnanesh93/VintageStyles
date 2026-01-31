import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    image:{type:Array, required:true},
    category:{type:String, required:true},
    subCategory:{type:String, required:true},
    productType: {type: String,required: true},
    sizes:{type:Array, required: false, default: ['free size']},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
    reviews:[{
        user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
        name:String,
        rating:Number,
        comment:String,
        images:[String],
        createdAt:{type:Date, default:Date.now }
    }],
    rating:{type:Number, default:0},
    numReviews:{type:Number, default:0}
})

const productModel=mongoose.models.product || mongoose.model("product",productSchema);
export default productModel;