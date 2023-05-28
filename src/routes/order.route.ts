import express from 'express';
import { 
    getOrders,
    getOrderById,
    getSalesReport,
    getTotalAmountOfSales,
    createOrder
} from '../controllers/orders.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';
import { checkAuth } from '../middlewares/auth.middleware';

const orderRoutes = express.Router();

orderRoutes.get('/orders/', checkAuth, getOrders);

orderRoutes.get('/orders/get-sales-report', checkAuth, getSalesReport);

orderRoutes.get('/orders/get-total-amount-of-sales', checkAuth, getTotalAmountOfSales);

orderRoutes.get('/orders/:id', checkAuth, validateMongoDBId, getOrderById);

orderRoutes.post('/orders', checkAuth, createOrder);

export default orderRoutes;