import { Request, Response } from 'express';
import config from '../config/config';
import jwt from 'jsonwebtoken';

export const getTockenFromHeader = (req: Request, res: Response) => {
    try { 
        if(
            !req.headers.authorization 
            || ( req.headers.authorization && !req.headers.authorization.split(' ').pop())
        ) {
            throw new Error("Missing authorization token");
        } 

        return req.headers.authorization.split(' ').pop();               
    } catch (error: any) { 
        res.status(401).json({
            error: error.message
        }); 
    }
}

export const checkAuthToken = (req: Request, res: Response) => {
    try { 
        const token = getTockenFromHeader(req, res);
        if (token) {
            const tokenData = jwt.verify(token, config.jwtSecret);                
            if (tokenData && typeof tokenData !== 'string' && tokenData._id) {
                return tokenData;                 
            } else {
                throw new Error("Invalid token");
            }                                                                           
        }             
    } catch (error: any) { 
        res.status(401).json({
            error: error.message
        }); 
    }
}

export const canAccessRoleAuth = (req: Request, res: Response, roles: string[])=> {
    try {
        const tokenData = checkAuthToken(req, res);
        if (tokenData && tokenData.role) {
            if (!roles.some(role => role === tokenData.role)) {
                throw new Error("User role does not have access");
            }                            
        }                    
    } catch (error: any) { 
        res.status(403).json({
            error: error.message
        }); 
    }
}