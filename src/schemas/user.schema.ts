import mongoose from "mongoose";
import { UserClass } from "../classes/user.class";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *        - role
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        role:
 *          type: string
 *          default: user
 *    SignIn:
 *      type: object
 *      required:
 *        - email
 *        - password       
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com        
 *        password:
 *          type: string
 *          default: stringPassword123       
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        _id:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        require: false
    },   
    email:  { 
        type: String,
        require: true
    },
    password: { 
        type: String,
        require: true
    },
    role: { 
        type: String,
        defaul: 'user'
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

userSchema.plugin(aggregatePaginate);
userSchema.loadClass(UserClass);

export { userSchema };