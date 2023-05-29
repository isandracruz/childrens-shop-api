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
import { validateSignUp } from '../validators/signUp.validator';

const userRoutes = express.Router();

/**
   * @openapi
   * '/users':
   *  get:
   *     tags:
   *     - Users
   *     summary: Get list of users    
   */
userRoutes.get('/users', checkRoleAuth(['administrator']), getUsers);

/**
   * @openapi
   * '/users/id':
   *  get:
   *     tags:
   *     - Users
   *     summary: Get user by ID  
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The user ID.
   *              
   */
  
userRoutes.get('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, getUserById);

/**
   * @openapi
   * '/users':
   *  post:
   *     tags:
   *     - Users
   *     summary: Create a user  
   */
userRoutes.post('/users', checkRoleAuth(['administrator']), validateSignUp, signUp);

/**
   * @openapi
   * '/users/:id':
   *  put:
   *     tags:
   *     - Users
   *     summary: Update a user 
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The user ID. 
   */
userRoutes.put('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, updateUser);

/**
   * @openapi
   * '/users/:id':
   *  delete:
   *     tags:
   *     - Users
   *     summary: Delete a user 
   *     parameters:
   *      - in: path
   *        name: id
   *        required: true
   *        type: string
   *        description: The user ID. 
   */
userRoutes.delete('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, deleteUser);

export default userRoutes;