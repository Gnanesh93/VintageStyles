import deliveryPartnerModel from "../models/deliveryPartnerModel.js";
import orderModel from "../models/orderModel.js";

// Add Delivery partner by Admin
const addDeliveryPartner=async (req,res)=>{
  try {
    const partner = new deliveryPartnerModel(req.body);
    await partner.save();
    res.json({success:true,message:"Partner added successfully"});
  } 
  catch(err){
    res.json({success: false,message: err.message});
  }
};

// List added delivery partners
const listDeliveryPartners=async (req,res)=>{
  try {
    const partners=await deliveryPartnerModel.find({});
    res.json({success:true,partners});
  } 
  catch (err){
    res.json({success:false,message:err.message});
  }
};

// Assign partner to user orders by Admin
const assignPartnerToOrder=async (req,res)=>{
  try {
    const {orderId,partnerId}=req.body;

    const partner=await deliveryPartnerModel.findOne({partnerId});
    if(!partner){
      return res.json({ success:false,message:"Partner not found"});
    }

    await orderModel.findByIdAndUpdate(orderId,{
      assignedPartner:{
        partnerId,
        companyName:partner.companyName,
        phone:partner.phone,
        charges:partner.charges
      }
    });

    res.json({success:true,message:"Partner assigned successfully"});

  } 
  catch (err){
    res.json({success:false,message:err.message});
  }
};

export {addDeliveryPartner,listDeliveryPartners,assignPartnerToOrder};
