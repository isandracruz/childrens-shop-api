import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/order.service";
import { ProductService } from "../services/product.service";
import { Types } from "mongoose";

const orderService = new OrderService();

const getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await orderService.getOrders(req);
        res.json(result);
    } catch (error) {
        console.log(error);
        next();
    }     
}

const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const orderId = req.params.id;  
        const ProductData = await orderService.getOrderById(orderId);
        
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

const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {  
        if (req.body.productId && Types.ObjectId.isValid(req.body.productId)){
            const productService = new ProductService();
            const product = await productService.getProductById(req.body.productId);

            if (product && product.inStock > 0) {
                await productService.updateProductStock(req.body.productId, 1);                
                const createdProduct = await orderService.createOrder(product);
                res.status(200).json(createdProduct);    
            } 
            res.status(400).json({ 
                error: 'The product is out of stock.'
            });                     
        } 
        res.status(400).json({ 
            error: 'Invalid product id.'
        });        
    } catch (error) {
        console.log(error);
        next();
    } 
}

export { 
    getOrders,    
    getOrderById,
    createOrder,    
};
