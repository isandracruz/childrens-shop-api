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
   */
productRoutes.get('/products', checkAuth, getProducts);

/**
   * @openapi
   * '/products/get-quantity-of-products':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get the quantity of products  
   */
productRoutes.get('/products/get-quantity-of-products', checkAuth, getQuantityOfProducts);

/**
   * @openapi
   * '/products/get-out-of-stock-products':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get out of stock products  
   */
productRoutes.get('/products/get-out-of-stock-products', checkAuth, getOutOfStockProducts);

/**
   * @openapi
   * '/products/:id':
   *  get:
   *     tags:
   *     - Products
   *     summary: Get product by ID 
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The product ID.  
   */
productRoutes.get('/products/:id', checkAuth, validateMongoDBId, getProductById);

/**
   * @openapi
   * '/products':
   *  post:
   *     tags:
   *     - Products
   *     summary: Create a product   
   */
productRoutes.post('/products', checkRoleAuth(['administrator', 'editor']), validateCreateProduct, createProduct);

/**
   * @openapi
   * '/products/:id':
   *  put:
   *     tags:
   *     - Products
   *     summary: Update a product 
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The product ID. 
   */
productRoutes.put('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, updateProduct);

/**
   * @openapi
   * '/products/:id':
   *  delete:
   *     tags:
   *     - Products
   *     summary: Delete a product
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The product ID.    
   */
productRoutes.delete('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, deleteProduct);

export default productRoutes;