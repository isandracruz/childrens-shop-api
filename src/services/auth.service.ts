import { Request, Response } from 'express';
import { UserDocument, userModel } from '../models/user.model';
import { UserClass } from '../classes/user.class';
import { UserInterface } from '../interfaces/user.interface';
import { UserService } from './user.service';
import bcrypt from "bcrypt";
import config from '../config/config';
import jwt from 'jsonwebtoken';

export class AuthService {     
    
    async signUp(req: Request, res: Response): Promise<UserDocument> {
        const userExists = await userModel.exists({ email: req.body.email });
        if (userExists) {
            throw new Error('The user exists');                
        } 
        const userData: UserInterface = new UserClass(req.body);
        const newUser = new userModel(userData);
        return await newUser.save();
    }

    async signIn(req: Request): Promise<object | null> {
        const userService = new UserService();
        const user = await userService.getUserByEmail(req.body.email);
        
        if  (user) {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (passwordIsValid) {
                const token = jwt.sign(
                    {
                        _id: user._id,
                        role: user.role
                    },
                    config.jwtSecret,
                    {
                        expiresIn: '30m', // 30 minutes
                    }
                );

                return {
                    data: {
                        email: user.email,
                        role: user.role
                    },
                    token
                }
            }
        }
        return null;
    }    
}