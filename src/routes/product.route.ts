import express from 'express';
import { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getQuantityOfProducts,
    getOutOfStockProducts
} from '../controllers/products.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';
import { checkAuth, checkRoleAuth } from '../middlewares/auth.middleware';
import { validateCreateProduct } from '../validators/createProduct.validator';

const productRoutes = express.Router();

/**
   * @openapi
   * '/products':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get list of products
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - name: name
   *        in: query
   *        type: string
   *      - name: price
   *        in: query
   *        type: integer
   *      - name: inStock
   *        in: query
   *        type: integer
   *      - name: categories
   *        in: query
   *        type: string
   *        example: Drinks, Fruits
   *      - name: tags
   *        in: query
   *        type: string
   *        example: Drinks, Fruits  
   *      - name: description
   *        in: query
   *        type: string
   *      - name: info
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
productRoutes.get('/products', checkAuth, getProducts);

/**
   * @openapi
   * '/products/get-quantity-of-products':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get the quantity of products
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *      - name: name
   *        in: query
   *        type: string
   *      - name: price
   *        in: query
   *        type: integer
   *      - name: inStock
   *        in: query
   *        type: integer
   *      - name: categories
   *        in: query
   *        type: string
   *        example: Drinks, Fruits
   *      - name: tags
   *        in: query
   *        type: string
   *        example: Drinks, Fruits  
   *      - name: description
   *        in: query
   *        type: string
   *      - name: info
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
productRoutes.get('/products/get-quantity-of-products', checkAuth, getQuantityOfProducts);

/**
   * @openapi
   * '/products/get-out-of-stock-products':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get out of stock products
   *     security:
   *        - bearerAuth: []
   *     parameters:
   *      - name: name
   *        in: query
   *        type: string
   *      - name: price
   *        in: query
   *        type: integer
   *      - name: inStock
   *        in: query
   *        type: integer
   *      - name: categories
   *        in: query
   *        type: string
   *        example: Drinks, Fruits
   *      - name: tags
   *        in: query
   *        type: string
   *        example: Drinks, Fruits  
   *      - name: description
   *        in: query
   *        type: string
   *      - name: info
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
productRoutes.get('/products/get-out-of-stock-products', checkAuth, getOutOfStockProducts);

/**
   * @openapi
   * '/products/{productId}':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get product by ID 
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - in: path
   *        name: productId
   *        required: true
   *        type: string
   *        description: The product ID.
   *     responses:
   *       200:
   *         description: Success  
   */
productRoutes.get('/products/:id', checkAuth, validateMongoDBId, getProductById);

/**
   * @openapi
   * '/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Create a product 
   *     security:
   *        - bearerAuth: [] 
   *     requestBody:
   *        required: true
   *        content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 required:
   *                    - name
   *                    - price
   *                    - inStock       
   *                 properties:
   *                    name:
   *                      type: string
   *                      default: Orange
   *                    price:
   *                       type: integer
   *                       default: 14
   *                    inStock:
   *                       type: integer
   *                       default: 20
   *                    categories:
   *                       type: array
   *                       default: ["Food", "Fruits"]
   *                    tags:
   *                       type: array
   *                       default: ["Food", "Fruits"]
   *                    description:
   *                       type: string
   *                       default: Orange
   *                    info:
   *                       type: string
   *                       default: The orange is a fruit
   *                    images:
   *                       type: array
   *     responses:
   *       200:
   *         description: Success  
   */
productRoutes.post('/products', checkRoleAuth(['administrator', 'editor']), validateCreateProduct, createProduct);

/**
   * @openapi
   * '/products/{productId}':
   *  put:
   *     tags:
   *     - Products
   *     summary: Update a product
   *     security:
   *        - bearerAuth: []  
   *     parameters:
   *      - in: path
   *        name: productId
   *        required: true
   *        type: string
   *        description: The product ID.
   *     responses:
   *       200:
   *         description: Success 
   */
productRoutes.put('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, updateProduct);

/**
   * @openapi
   * '/products/{productId}':
   *  delete:
   *     tags:
   *     - Products
   *     summary: Delete a product
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - in: path
   *        name: productId
   *        required: true
   *        type: string
   *        description: The product ID.  
   *     responses:
   *       200:
   *         description: Success  
   */
productRoutes.delete('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, deleteProduct);

export default productRoutes;