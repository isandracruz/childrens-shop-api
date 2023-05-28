import { Request } from 'express';
import { UserDocument, userModel } from '../models/user.model';
import { AggregatePaginateResult } from 'mongoose';

export class UserService { 
    getUserMatchQuery(req: Request) {
        let matchQuery = []; 
        
        if (req.query.name) {
            const nameQuery = String(req.query.name)
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');           

            matchQuery.push({ name: {$regex: new RegExp(`.*${nameQuery}.*`, 'gi')} });
        } 

        if (req.query.email) {
            const emailQuery = String(req.query.email)
            .replace(/a/g, '[a,á,à,ä,â]')
            .replace(/e/g, '[e,é,ë,è]')
            .replace(/i/g, '[i,í,ï,ì]')
            .replace(/o/g, '[o,ó,ö,ò]')
            .replace(/u/g, '[u,ü,ú,ù]');

            matchQuery.push({ email: {$regex: new RegExp(`.*${emailQuery}.*`, 'gi') }});
        }

        if (req.query.role) matchQuery.push({ role: String(req.query.role)});

        return matchQuery.length > 0 ? { $and: matchQuery } : {};
    }
    
    async getUsers(req: Request): Promise<AggregatePaginateResult<UserDocument>> {
             
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

        const $match = this.getUserMatchQuery(req);        
              
        const aggregate = userModel.aggregate([                                      
            { $match }
        ]);  
        
        return await userModel.aggregatePaginate(aggregate, options);           
    }
    
    async getUserById (req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;        
        return await userModel.findById(userId);              
    }
    
    async createUser(req: Request): Promise<UserDocument> {
        const newUser = new userModel(req.body);
        return await newUser.save();             
    }
    
    async updateUser(req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;  
        return await userModel.findByIdAndUpdate(userId, req.body, {new: true});             
    }
    
    async deleteUser(req: Request): Promise<void | null>{
        const userId = req.params.id;   
        return await userModel.findByIdAndRemove(userId);                 
    }
}