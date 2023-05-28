import { Request } from 'express';
import mongoose, { AggregatePaginateResult } from 'mongoose';
import moment from 'moment';
import { OrderDocument, orderModel } from '../models/order.model';
import { OrderInterface } from '../interfaces/order.interface';
import { ProductDocument } from '../models/product.model';

export class OrderService {     
    
    async getOrders(req: Request): Promise<AggregatePaginateResult<OrderDocument>> {             
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
              
        const aggregate = orderModel.aggregate([                                      
            { $match },
        ]);  
        
        return await orderModel.aggregatePaginate(aggregate, options);           
    }

    getProductMatchQuery(req: Request) {
        let matchQuery = []; 

        if (req.query.productId && mongoose.Types.ObjectId.isValid(String(req.query.productId))) 
            matchQuery.push({ _id: new mongoose.Types.ObjectId(String(req.query.productId))});

        if (req.query.name) {
            const nameQuery = String(req.query.name)
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');           

            matchQuery.push({ name: {$regex: new RegExp(`.*${nameQuery}.*`, 'gi')} });
        } 

        if (req.query.price) matchQuery.push({ price: Number(req.query.price)});
        if (req.query.inStock) matchQuery.push({ inStock: Number(req.query.inStock)});

        if (req.query.categories) {
            const categoriesQuery = String(req.query.categories).split(', ');
            matchQuery.push({ categories: { $in: categoriesQuery}});
        }
        if (req.query.tags) {
            const tagsQuery = String(req.query.tags).split(', ');
            matchQuery.push({ categories: { $in: tagsQuery}});
        }
        if (req.query.description) {
            const descriptionQuery = String(req.query.description)
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');           

            matchQuery.push({ description: {$regex: new RegExp(`.*${descriptionQuery}.*`, 'gi')} });
        } 
        if (req.query.info) {
            const infoQuery = String(req.query.info)
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');           

            matchQuery.push({ info: {$regex: new RegExp(`.*${infoQuery}.*`, 'gi')} });
        }

        if (req.query.createdAtStart)
            matchQuery.push({
                createdAt: {
                    $gte: new Date(moment(new Date(String(req.query.createdAtStart)))
                        .startOf('date').format())
                }
            });
        if (req.query.createdAtEnd) 
            matchQuery.push({
                createdAt: {
                    $lte: new Date(moment(new Date(String(req.query.createdAtEnd)))
                        .endOf('date').format())
                }
            }); 

        return matchQuery.length > 0 ? { $and: matchQuery } : {};
    }
    
    
    async getOrderById (orderId: string): Promise<OrderDocument | null> {              
        return await orderModel.findById(orderId);              
    }
    
    async createOrder(product: ProductDocument): Promise<OrderDocument | null> { 
        const orderData: OrderInterface = {
            price: product.price, 
            amount: product.price,
            quantity: 1,                
            productId: String(product._id)
        } 
        const newOrder = new orderModel(orderData);
        return await newOrder.save();                           
    }
}