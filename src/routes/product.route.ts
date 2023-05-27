import express from 'express';
import { 
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getQuantityOfProducts
} from '../controllers/products.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';

const productRoutes = express.Router();

productRoutes.get('/products/', getProducts);

productRoutes.get('/products/get-quantity-of-products', getQuantityOfProducts);

productRoutes.get('/products/:id', validateMongoDBId, getProductById);

productRoutes.post('/products', createProduct);

productRoutes.put('/products/:id', validateMongoDBId, updateProduct);

productRoutes.delete('/products/:id', validateMongoDBId, deleteProduct);

export default productRoutes;