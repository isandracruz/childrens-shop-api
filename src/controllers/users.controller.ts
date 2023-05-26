import { Request, Response, NextFunction } from "express";

const getUsers = (req: Request, res: Response, next: NextFunction): void =>  {
    res.send('Show info of all users');
}

const getUserById = (req: Request, res: Response, next: NextFunction): void =>  {
    res.send(`Show info of user ${req.params.id}`);
}

const createUser = (req: Request, res: Response, next: NextFunction): void =>  {
    const name = req.body?.name || 'default'
    res.send(`Create user with name ${name}`);
}

const updateUser = (req: Request, res: Response, next: NextFunction): void =>  {
    res.send(`Update user with id ${req.params.id}`);
}

const deleteUser = (req: Request, res: Response, next: NextFunction): void =>  {
    res.send(`Delete user with id ${req.params.id}`);
}

export { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};
