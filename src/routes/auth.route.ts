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
   *                 $ref: '#/components/schemas/SignIn'           
   *     responses:
   *       '200':
   *        description: successful operation
   * 
   */
authRoutes.post('/signin', validateSignIn, signIn);

export default authRoutes;