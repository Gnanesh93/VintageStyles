import mongoose from "mongoose";

const deliveryPartnerSchema=new mongoose.Schema({
  companyName:{type:String,required:true},
  partnerId:{type:String,required:true,unique:true},
  address:{type:String,required:true},
  customerRatings:{type:Number,required:true},
  phone:{type:String,required:true},
  connections:{type:[String],required:true},    
  charges:{type:Number,required:true}           
});

const deliveryPartnerModel = mongoose.models.deliveryPartner || mongoose.model("deliveryPartner", deliveryPartnerSchema);

export default deliveryPartnerModel;
