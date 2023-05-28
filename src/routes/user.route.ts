import express from 'express';
import { 
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../controllers/users.controller';
import validateMongoDBId from '../middlewares/validateMongoId.middleware';
import { signUp } from '../controllers/auth.controller';
import { checkRoleAuth } from '../middlewares/auth.middleware';

const userRoutes = express.Router();

userRoutes.get('/users/', checkRoleAuth(['administrator']), getUsers);

userRoutes.get('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, getUserById);

userRoutes.post('/users', checkRoleAuth(['administrator']), signUp);

userRoutes.put('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, updateUser);

userRoutes.delete('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, deleteUser);

export default userRoutes;