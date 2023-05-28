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
        const order = await orderService.getOrderById(orderId);
        
        order
        ? res.status(200).json(order)
        : res.status(404).json({ 
            error: 'Product not found'
        });
    } catch (error) {
        console.log(error);
        next();
    }     
}

const getSalesReport = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const salesReport = await orderService.getSalesReport(req);
        res.json(salesReport);
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
            } else {
                res.status(400).json({ 
                    error: 'The product is out of stock.'
                });
            }                                 
        } else {
            res.status(400).json({ 
                error: 'Invalid product id.'
            });
        }                
    } catch (error) {
        console.log(error);
        next();
    } 
}

export { 
    getOrders,    
    getOrderById,
    getSalesReport,
    createOrder,    
};
