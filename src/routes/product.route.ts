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

const productRoutes = express.Router();

productRoutes.get('/products/', checkAuth, getProducts);

productRoutes.get('/products/get-quantity-of-products', checkAuth, getQuantityOfProducts);

productRoutes.get('/products/get-out-of-stock-products', checkAuth, getOutOfStockProducts);

productRoutes.get('/products/:id', checkAuth, validateMongoDBId, getProductById);

productRoutes.post('/products', checkRoleAuth(['administrator', 'editor']), createProduct);

productRoutes.put('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, updateProduct);

productRoutes.delete('/products/:id', checkRoleAuth(['administrator', 'editor']), validateMongoDBId, deleteProduct);

export default productRoutes;