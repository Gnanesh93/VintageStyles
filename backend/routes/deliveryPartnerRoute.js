import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import {addDeliveryPartner,listDeliveryPartners,assignPartnerToOrder} from '../controllers/deliveryPartnerController.js';

const deliveryPartnerRouter = express.Router();

// 1.create delivery partner
deliveryPartnerRouter.post('/add',adminAuth,addDeliveryPartner);

// 2.list added delivery partners
deliveryPartnerRouter.get('/list',adminAuth,listDeliveryPartners);

// 3.assign a partner to the user placed order
deliveryPartnerRouter.post('/assign',adminAuth,assignPartnerToOrder);

export default deliveryPartnerRouter;
