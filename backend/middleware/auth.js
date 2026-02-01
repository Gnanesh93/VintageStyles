import jwt from "jsonwebtoken";

const authUser = async(req,res,next)=>{
  const token = req.headers.token;

  if (!token) {
    return res.json({success:false, message: "Not Authorized! Login again"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.userId = decoded.id;
    req.userName = decoded.name || "Customer";

    next();
  } 
  catch (error){
    console.log(error);
    res.json({success: false,message: error.message});
  }
};

export default authUser;
