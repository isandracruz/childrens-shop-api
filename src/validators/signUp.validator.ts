import { checkSchema} from "express-validator";
import { emailSchema, passwordSchema } from "../helpers/validator.helper";

const schema = {
    email: emailSchema,
    password: passwordSchema,
    role: { 
        notEmpty: {
            errorMessage: 'Role is required',
        },       
        isIn: { 
            options: [['user', 'administrator', 'editor']],
            errorMessage: 'Roles can only be user, editor and administrator'
        },
    },
};

export const validateSignUp = checkSchema(schema, ['body']);




