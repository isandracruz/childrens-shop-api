import { Request } from 'express';
import { User, UserDocument } from '../models/user.model';
import { Types } from 'mongoose';

export class UserService {    
    
    async getUsers(req: Request): Promise<UserDocument[]> {
        return await User.find({});
    }
    
    async getUserById (req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;
        if (Types.ObjectId.isValid(userId)) {
            return await User.findById(userId);
        }        
        return null;        
    }
    
    async createUser(req: Request): Promise<UserDocument> {
        const newUser = new User(req.body);
        return await newUser.save();             
    }
    
    async updateUser(req: Request): Promise<UserDocument | null> {
        const userId = req.params.id;        
        if (Types.ObjectId.isValid(userId)) {            
            return User.findByIdAndUpdate(userId, req.body, {new: true});
        }        
        return null;        
    }
    
    async deleteUser(req: Request): Promise<void | null>{
        const userId = req.params.id;        
        if (Types.ObjectId.isValid(userId)) {            
            return User.findByIdAndRemove(userId);
        }        
        return null;         
    }


}