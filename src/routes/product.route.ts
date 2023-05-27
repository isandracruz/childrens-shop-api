import express from 'express';
import { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';

const productRoutes = express.Router();

productRoutes.get('/products/', getProducts);

productRoutes.get('/products/:id', validateMongoDBId, getProductById);

productRoutes.post('/products', createProduct);

productRoutes.put('/products/:id', validateMongoDBId, updateProduct);

productRoutes.delete('/products/:id', validateMongoDBId, deleteProduct);

export default productRoutes;