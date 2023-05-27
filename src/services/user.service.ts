import { Request } from 'express';
import { User, UserDocument } from '../models/user.model';

export class UserService { 
    
    async getUsers(req: Request): Promise<UserDocument[]> {
        return await User.find({});
    }
    
    async getUserById (req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;        
        return await User.findById(userId);              
    }
    
    async createUser(req: Request): Promise<UserDocument> {
        const newUser = new User(req.body);
        return await newUser.save();             
    }
    
    async updateUser(req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;  
        return User.findByIdAndUpdate(userId, req.body, {new: true});             
    }
    
    async deleteUser(req: Request): Promise<void | null>{
        const userId = req.params.id;   
        return User.findByIdAndRemove(userId);                 
    }

}