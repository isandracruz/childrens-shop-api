import express from 'express';
import { 
    getOrders,
    getOrderById,
    createOrder
} from '../controllers/orders.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';

const orderRoutes = express.Router();

orderRoutes.get('/orders/', getOrders);

orderRoutes.get('/orders/:id', validateMongoDBId, getOrderById);

orderRoutes.post('/orders', createOrder);

export default orderRoutes;