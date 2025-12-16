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

// Connect DB and Cloudinary
connectDb();
connectCloudinary();

// Middleware
app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:5174",
    "https://vintage-styles-frontend.vercel.app",
    "https://vintage-styles-admin.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));


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
