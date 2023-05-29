import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { validationResult } from "express-validator";

const authService = new AuthService();

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {
        const errors = validationResult(req);        
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const createduser = await authService.signUp(req, res);  
            if (!createduser){
                throw new Error("User registration failed");
            }     
            res.send({ message: "User registered successfully!" });
        }        
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const errors = validationResult(req);
          
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        } else {
            const result = await authService.signIn(req);

            if (!result) {
                throw new Error('Request failed');                
            } 
            res.json(result);            
        }     
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

export { 
    signUp,
    signIn   
};
