import express from 'express';
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users.controller';

const userRoutes = express.Router();

userRoutes.get('/users/', getUsers);

userRoutes.get('/users/:id', getUserById);

userRoutes.post('/users', createUser);

userRoutes.put('/users/:id', updateUser);

userRoutes.delete('/users/:id', deleteUser);

export default userRoutes;