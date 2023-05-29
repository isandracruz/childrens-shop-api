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
   *     security:
   *        - bearerAuth: [] 
   *     parameters:
   *      - name: username
   *        in: query
   *        type: string
   *      - name: email
   *        in: query
   *        type: string
   *      - name: role
   *        in: query
   *        type: string
   *     responses:
   *       200:
   *         description: Success 
   */
userRoutes.get('/users', checkRoleAuth(['administrator']), getUsers);

/**
   * @openapi
   * '/users/{userId}':
   *  get:
   *     tags:
   *     - Users
   *     summary: Get user by ID
   *     security:
   *        - bearerAuth: []  
   *     parameters:
   *      - in: path
   *        name: userId
   *        required: true
   *        type: string
   *        description: The user ID.
   *     responses:
   *       200:
   *         description: Success              
   */  
userRoutes.get('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, getUserById);

/**
   * @openapi
   * '/users':
   *  post:
   *     tags:
   *     - Users
   *     summary: Create a user
   *     security:
   *        - bearerAuth: []    
   *     requestBody:
   *        required: true
   *        content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 required:
   *                    - email
   *                    - password
   *                    - role       
   *                 properties:
   *                    email:
   *                      type: string
   *                      default: jane.doe@example.com
   *                    username:
   *                       type: string
   *                       default: Jane Doe
   *                    password:
   *                       type: string
   *                       default: stringPassword123
   *                    role:
   *                       type: string
   *                       default: user 
   *     responses:
   *       200:
   *         description: Success  
   */
userRoutes.post('/users', checkRoleAuth(['administrator']), validateSignUp, signUp);

/**
   * @openapi
   * '/users/{userId}':
   *  put:
   *     tags:
   *     - Users
   *     summary: Update a user 
   *     security:
   *        - bearerAuth: []  
   *     parameters:
   *      - in: path
   *        name: userId
   *        required: true
   *        type: string
   *        description: The user ID. 
   *     requestBody:
   *        required: true
   *        content:
   *           application/json:
   *              schema:
   *                 type: object                       
   *                 properties:
   *                    email:
   *                      type: string
   *                      default: jane.doe@example.com
   *                    username:
   *                       type: string
   *                       default: Jane Doe
   *                    password:
   *                       type: string
   *                       default: stringPassword123
   *                    role:
   *                       type: string
   *                       default: user
   *     responses:
   *       200:
   *         description: Success  
   */
userRoutes.put('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, updateUser);

/**
   * @openapi
   * '/users/{userId}':
   *  delete:
   *     tags:
   *     - Users
   *     summary: Delete a user 
   *     security:
   *        - bearerAuth: []  
   *     parameters:
   *      - in: path
   *        name: userId
   *        required: true
   *        type: string
   *        description: The user ID. 
   *     responses:
   *       200:
   *         description: Success  
   */
userRoutes.delete('/users/:id', checkRoleAuth(['administrator']), validateMongoDBId, deleteUser);

export default userRoutes;