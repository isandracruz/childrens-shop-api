
import { Request, Response, NextFunction } from "express";
import { canAccessRoleAuth, checkAuthToken } from "../helper/auth.helper";

export const checkAuth =
  async (req: Request, res: Response, next: NextFunction) => {   
    try { 
        checkAuthToken(req, res);  
        next();   
      } catch (error: any) { 
        res.status(401).json({
            error: error.message
        });        
      }
};

export const checkRoleAuth = 
    (roles: string[]) => 
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                canAccessRoleAuth(req, res, roles);
                next();
            } catch (error: any) {
                return res.status(403).json(error);  
            }
}