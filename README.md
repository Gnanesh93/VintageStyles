# 🛍️ Vintage Styles – Full Stack E-Commerce Application

Vintage Styles is a full-stack e-commerce web application built using the **MERN stack**.  
It supports user shopping, admin product management, order tracking, secure payments, and customer reviews.

---

## 🌐 Live Demo

- Frontend   : https://vintage-styles-frontend.vercel.app  
- Admin Panel: https://vintage-styles-admin.vercel.app  
- Backend API: https://vintage-styles-backend.vercel.app  

---

## ✨ Key Features

### 👤 User Features
- User authentication using JWT
- Browse products with multiple images
- Product detail page with size selection
- Add to cart & manage cart
- Place orders using:
  - Cash on Delivery
  - Stripe payment gateway
- Track order status
- Write product reviews only after order delivery
- Upload up to 4 images per review
- View ratings summary & star-based reviews (Amazon-like UI)

### 🛠️ Admin Features
- Secure admin authentication
- Add / remove products
- Upload multiple product images
- View all customer orders
- Update order status (Placed → Shipped → Delivered)
- Assign delivery partners
- Manage delivery partner data

---

## 🧱 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Multer (multipart form handling)
- Cloudinary (image storage)
- Stripe (online payments)

---

## 🧠 Architecture Highlights

- JWT-based authentication middleware
- Role-based access (User / Admin)
- Secure REST API routes
- Multipart form handling for image uploads
- Review eligibility strictly validated using order status
- Clean separation of controllers, routes, models, and middleware

---

## 📁 Project Structure

vintage-styles/  
├── backend/  
│   ├── controllers/  
│   ├── models/  
│   ├── routes/  
│   ├── middleware/  
│   ├── config/ 
    ├── utility/ 
│   └── server.js  
│  
├── frontend/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── context/  
│   │   └── assets/  
│   └── main.jsx  
│  
├── admin/  
│   ├── src/  
│   │   ├── components/  
│   │   ├── pages/  
│   │   ├── assets/  
│   │   └── App.jsx  
│   └── main.jsx  
│  
└── README.md  

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** folder and add the following:

PORT=PORT_NUMBER  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
CLOUDINARY_NAME=your_cloudinary_name  
CLOUDINARY_API_KEY=your_cloudinary_api_key  
CLOUDINARY_API_SECRET=your_cloudinary_api_secret  
STRIPE_SECRET_KEY=your_stripe_secret_key  
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

---

## ▶️ Running the Project Locally

### Backend
cd backend  
npm install  
npm run server  

### Frontend
cd frontend  
npm install  
npm run dev  

### Admin Panel
cd admin  
npm install  
npm run dev  

---

## 🔐 Authentication & Authorization

- JWT tokens are stored securely on the client
- Middleware attaches authenticated user ID to requests
- Admin routes are protected separately
- Reviews are allowed only for Delivered orders

---

## 📌 Key Learning Outcomes

- Designing secure REST APIs
- Handling multipart form data
- JWT authentication & middleware flow
- Role-based access control
- Real-world cart & order logic
- Review authorization logic (post-delivery only)
- Clean and maintainable backend structure

---

## 🚀 Future Enhancements

- Edit & delete reviews
- Email notifications
- Product recommendations

---

## ⚠️ Disclaimer

All product images used in this project are sourced from publicly available e-commerce websites and are used strictly for **educational and demonstration purposes only**.  
This project is non-commercial and does not claim ownership of any third-party images.



