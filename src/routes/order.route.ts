import express from 'express';
import { 
    getOrders,
    getOrderById,
    getSalesReport,
    createOrder
} from '../controllers/orders.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';

const orderRoutes = express.Router();

orderRoutes.get('/orders/', getOrders);

orderRoutes.get('/orders/get-sales-report', getSalesReport);

orderRoutes.get('/orders/:id', validateMongoDBId, getOrderById);

orderRoutes.post('/orders', createOrder);

export default orderRoutes;