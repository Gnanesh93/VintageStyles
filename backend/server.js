import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import deliveryPartnerRouter from "./routes/deliveryPartnerRoute.js";


const app = express();
const port = process.env.PORT || 5000;



const allowedOrigins= [
    "http://localhost:5174",
    "http://localhost:5173",
    "https://vintage-styles-frontend.vercel.app",
    "https://vintage-styles-admin.vercel.app",
  ]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS blocked"));
    }
  },
  credentials: true
}));




// Connect DB and Cloudinary
connectDb();
connectCloudinary();

app.use(express.json());


// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use("/api/partner", deliveryPartnerRouter);


// Test route
app.get('/', (req, res) => {
  res.send("API is Working");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
