import { checkSchema} from "express-validator";
import { emailSchema, passwordSchema } from "../helpers/validator.helper";

const schema = {
    email: emailSchema,
    password: passwordSchema
};

export const validateSignIn = checkSchema(schema, ['body']);
