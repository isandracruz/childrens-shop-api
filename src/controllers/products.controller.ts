import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/product.service";
import { validationResult } from "express-validator";


const productService = new ProductService();

const getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await productService.getProducts(req);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const getQuantityOfProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await productService.getQuantityOfProducts(req);
        res.json({
            quantityOfProducts: result
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const getOutOfStockProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const outOfStockProducts = await productService.getOutOfStockProducts(req);
        res.json(outOfStockProducts);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {    
        const userId = req.params.id; 
        const product = await productService.getProductById(userId);
        
        product
        ? res.status(200).json(product)
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const createdProduct = await productService.createProduct(req);        
            res.json(createdProduct);
        }        
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
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
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    } 
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const result = await productService.deleteProduct(req.params.id);
        
        result
        ? res.status(200).json({ 
            success: true
        })
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }    
}

export { 
    getProducts,
    getQuantityOfProducts,
    getOutOfStockProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
