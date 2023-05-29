import express from 'express';
import { 
    signIn,
    signUp
} from '../controllers/auth.controller';
import { validateSignIn } from '../validators/signIn.validator';
import { validateSignUp } from '../validators/signUp.validator';

const authRoutes = express.Router();

/**
   * @openapi
   * '/signup':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Sign up  
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
authRoutes.post('/signup', validateSignUp, signUp);

/**
   * @openapi
   * '/signin':
   *  post:
   *     tags:
   *     - Auth
   *     summary: Sign in  
   *     requestBody:
   *        required: true
   *        content:
   *           application/json:
   *              schema:
   *                 type: object
   *                 required:
   *                    - email
   *                    - password       
   *                 properties:
   *                    email:
   *                       type: string
   *                       default: jane.doe@example.com        
   *                    password:
   *                       type: string
   *                       default: stringPassword123  
   *     responses:
   *       200:
   *         description: Success   
   */
authRoutes.post('/signin', validateSignIn, signIn);

export default authRoutes;