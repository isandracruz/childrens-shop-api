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

        const $match = this.getOrderMatchQuery(req);        
              
        const aggregate = orderModel.aggregate([                                      
            { $match },
            {
                $lookup: {
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "product",
                } 
            },
            {
                $unwind: {
                    path: "$product"
                },
            },
            {
                $addFields: {
                    productName: "$product.name"
                }
            },
            {
                $unset: ["product"]
            }
        ]);  
        
        return await orderModel.aggregatePaginate(aggregate, options);           
    }

    async getSalesReport(req: Request){
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

        const $match = this.getOrderMatchQuery(req);        
              
        const aggregate = orderModel.aggregate([                                      
            { $match },
            {
                $lookup: {
                  from: "products",
                  localField: "productId",
                  foreignField: "_id",
                  as: "product",
                } 
            },
            {
                $unwind: {
                    path: "$product"
                },
            },
            {
                $group: {
                    _id: {
                      productName: "$product.name",                      
                      inStock: "$product.inStock"                      
                    },
                    totalQuantity: { $sum: "$quantity" },
                    totalAmount: { 
                      $sum: { 
                        $multiply: [ "$price", "$quantity" ] 
                      } 
                    },
                }
            },
            {
                $replaceRoot: { newRoot: { $mergeObjects:  [ "$_id", "$$ROOT" ] }}
            },
            {
                $unset: ['_id']
            }
        ]);  
        
        return await orderModel.aggregatePaginate(aggregate, options);           
    }

    getOrderMatchQuery(req: Request) {
        let matchQuery = [];               
                  
        if (req.query.productId) {
            mongoose.Types.ObjectId.isValid(String(req.query.productId))
            ? matchQuery.push({ productId: new mongoose.Types.ObjectId(String(req.query.productId))})
            : matchQuery.push({ productId: null});
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

        console.log(matchQuery)

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