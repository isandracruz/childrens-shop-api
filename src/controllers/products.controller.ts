import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";


const productService = new ProductService();

const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await productService.getProducts(req);
        res.json(result);
    } catch (error) {
        console.log(error);
        next();
    }     
}

const getQuantityOfProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await productService.getQuantityOfProducts(req);
        res.json({
            quantityOfProducts: result
        });
    } catch (error) {
        console.log(error);
        next();
    }     
}

const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {    
        const userId = req.params.id; 
        const ProductData = await productService.getProductById(userId);
        
        ProductData
        ? res.status(200).json(ProductData)
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error) {
        console.log(error);
        next();
    }     
}

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try { 
        const createdProduct = await productService.createProduct(req);        
        res.json(createdProduct);
    } catch (error) {
        console.log(error);
        next();
    } 
}

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const updatedProduct = await productService.updateProduct(req);
        
        updatedProduct
        ? res.status(200).json(updatedProduct)
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error) {
        console.log(error);
        next();
    } 
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const result = await productService.deleteProduct(req);
        
        result
        ? res.status(200).json({ 
            success: true
        })
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error) {
        console.log(error);
        next();
    }     
}

export { 
    getProducts,
    getQuantityOfProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
