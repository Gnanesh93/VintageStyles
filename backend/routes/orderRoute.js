import express from 'express'
import {placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus, verifyStripe,trackOrder,downloadUserInvoice,downloadAdminInvoice} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter=express.Router()
// Admin handles
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// User invoice generate
orderRouter.get('/user-invoice/:orderId',authUser,downloadUserInvoice);

// Admin invoice generate
orderRouter.get('/admin-invoice/:orderId',adminAuth,downloadAdminInvoice);

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

orderRouter.post('/userorders',authUser,userOrders)
// protected track route for users
orderRouter.post('/track', authUser, trackOrder);


//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;