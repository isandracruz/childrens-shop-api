import express from 'express';
import { 
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/users.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';

const userRoutes = express.Router();

userRoutes.get('/users/', getUsers);

userRoutes.get('/users/:id', validateMongoDBId, getUserById);

userRoutes.post('/users', createUser);

userRoutes.put('/users/:id', validateMongoDBId, updateUser);

userRoutes.delete('/users/:id', validateMongoDBId, deleteUser);

export default userRoutes;