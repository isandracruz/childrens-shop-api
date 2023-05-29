import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();

const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {   
        const result = await userService.getUsers(req);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const userData = await userService.getUserById(req.params.id);
        
        userData
        ? res.status(200).json(userData)
        : res.status(404).json({ 
            error: 'User not found'
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    }     
}

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const updatedUser = await userService.updateUser(req);
        
        updatedUser
        ? res.status(200).json(updatedUser)
        : res.status(404).json({ 
            error: 'User not found'
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    } 
}

const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    try {     
        const result = await userService.deleteUser(req);
        
        result
        ? res.status(200).json({ 
            success: true
        })
        : res.status(404).json({ 
            error: 'User not found'
        });
    } catch (error: any) {
        res.status(500).json({
            error: error.message
        });
    } 
}

export { 
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
