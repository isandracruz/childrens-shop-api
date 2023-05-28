import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        await authService.signUp(req);       
        res.send({ message: "User registered successfully!" });
    } catch (error) {
        console.log(error);
        next();
    }     
}

const signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {           
        const result = await authService.signIn(req);

        result
        ? res.json(result)
        : res.status(400).json({ error: 'Request failed'});      
    } catch (error) {
        console.log(error);
        next();
    }     
}

export { 
    signUp,
    signIn   
};
