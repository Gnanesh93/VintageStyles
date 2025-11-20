import express from 'express';
import cors from 'cors';
import 'dotenv/config' ;
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import deliveryPartnerRouter from './routes/deliveryPartnerRoute.js';
import cors from "cors";

const app=express()
const port=process.env.PORT || 5000

connectDb()
connectCloudinary();

app.use(express.json())

app.use(cors({
  origin: [
    "http://localhost:5173",     
    "http://localhost:5174",     
    "https://vintage-styles-frontend.vercel.app",
    "https://vintage-styles-admin.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "token"],
  credentials: true
}));







// api end points
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/partner', deliveryPartnerRouter);


app.get('/',(req,res)=>{
    res.send("Api Working")
})

app.listen(port,()=>{
    console.log(`server up! at ${port}`)
})
