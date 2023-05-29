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
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - name: productId
   *        in: query
   *        type: string
   *      - name: createdAtStart
   *        in: query
   *        type: string 
   *        example: 2023-05-29 
   *      - name: createdAtEnd
   *        in: query
   *        type: string 
   *        example: 2023-05-29 
   *     responses:
   *       200:
   *         description: Success
   */
orderRoutes.get('/orders', checkAuth, getOrders);

/**
   * @openapi
   * '/orders/get-sales-report':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get the sales report 
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *      - name: productId
   *        in: query
   *        type: string
   *      - name: createdAtStart
   *        in: query
   *        type: string 
   *        example: 2023-05-29 
   *      - name: createdAtEnd
   *        in: query
   *        type: string 
   *        example: 2023-05-29
   *     responses:
   *       200:
   *         description: Success 
   */
orderRoutes.get('/orders/get-sales-report', checkAuth, getSalesReport);

/**
   * @openapi
   * '/orders/get-total-amount-of-sales':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get the total amount of sales
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - name: productId
   *        in: query
   *        type: string
   *      - name: createdAtStart
   *        in: query
   *        type: string 
   *        example: 2023-05-29 
   *      - name: createdAtEnd
   *        in: query
   *        type: string 
   *        example: 2023-05-29
   *     responses:
   *       200:
   *         description: Success 
   */
orderRoutes.get('/orders/get-total-amount-of-sales', checkAuth, getTotalAmountOfSales);

/**
   * @openapi
   * '/orders/{orderId}':
   *  get:
   *     tags:
   *     - Orders
   *     summary: Get a order by ID
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *      - in: path
   *        name: orderId
   *        required: true
   *        type: string
   *        description: The order ID.
   *     responses:
   *       200:
   *         description: Success
   */
orderRoutes.get('/orders/:id', checkAuth, validateMongoDBId, getOrderById);

/**
   * @openapi
   * '/orders':
   *  post:
   *     tags:
   *     - Orders
   *     summary: Create a order
   *     security:
   *        - bearerAuth: []
   *     requestBody:
   *        required: true
   *        content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 required:
   *                    - productId      
   *                 properties:
   *                    productId:
   *                      type: string
   *                      default: 647122976ddfd42dd51a0369 
   *     responses:
   *       200:
   *         description: Success
   */
orderRoutes.post('/orders', checkAuth, createOrder);

export default orderRoutes;