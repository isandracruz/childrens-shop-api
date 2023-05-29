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

/**
   * @openapi
   * '/orders':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get list of orders  
   */
orderRoutes.get('/orders', checkAuth, getOrders);

/**
   * @openapi
   * '/orders/get-sales-report':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get the sales report  
   */
orderRoutes.get('/orders/get-sales-report', checkAuth, getSalesReport);

/**
   * @openapi
   * '/orders/get-total-amount-of-sales':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get the total amount of sales  
   */
orderRoutes.get('/orders/get-total-amount-of-sales', checkAuth, getTotalAmountOfSales);

/**
   * @openapi
   * '/orders/:id':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get a order by ID
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The order ID.
   */
orderRoutes.get('/orders/:id', checkAuth, validateMongoDBId, getOrderById);

/**
   * @openapi
   * '/orders':
   *  post:
   *     tags:
   *     - Orders
   *     summary: Create a order 
   */
orderRoutes.post('/orders', checkAuth, createOrder);

export default orderRoutes;