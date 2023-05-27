import { Request } from 'express';
import { AggregatePaginateResult } from 'mongoose';
import { ProductDocument, productModel } from '../models/product.model';

export class ProductService {     
    
    async getProducts(req: Request): Promise<AggregatePaginateResult<ProductDocument>> {
             
        const page = req.query.page ? Number(req.query.page) : 1;
        const limit = req.query.pageSize ? Number(req.query.pageSize) : 10;

        const options = {
            page: page,
            limit: limit,
            customLabels: {
                totalDocs: 'total',
                docs: 'data',
                limit: 'per_page',
                page: 'page',
                totalPages: 'total_pages',
            }           
        };

        const $match = {};        
              
        const aggregate = productModel.aggregate([                                      
            { $match }
        ]);  
        
        return await productModel.aggregatePaginate(aggregate, options);           
    }
    
    async getProductById (req: Request): Promise<ProductDocument | null> {
        const userId = req.params.id;        
        return await productModel.findById(userId);              
    }
    
    async createProduct(req: Request): Promise<ProductDocument> {
        const newProduct = new productModel(req.body);
        return await newProduct.save();             
    }
    
    async updateProduct(req: Request): Promise<ProductDocument | null> {
        const productId = req.params.id;  
        return productModel.findByIdAndUpdate(productId, req.body, { new: true });             
    }
    
    async deleteProduct(req: Request): Promise<void | null>{
        const productId = req.params.id;   
        return productModel.findByIdAndRemove(productId);                 
    }
}