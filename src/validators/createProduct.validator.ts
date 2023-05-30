import { checkSchema} from "express-validator";

const schema = { 
    sku: { 
        notEmpty: {
            errorMessage: 'Product sku is required',
        },
        isString: {
            errorMessage: 'Product sku must be a string',
        }
    },   
    name: { 
        notEmpty: {
            errorMessage: 'Product name is required',
        },
        isString: {
            errorMessage: 'Product name must be a string',
        }
    },
    price: { 
        notEmpty: {
            errorMessage: 'Product price is required',
        },
        isNumeric: {            
            errorMessage: 'Product price must be a number',
        }
    },
    inStock: { 
        notEmpty: {
            errorMessage: 'Product stock is required'
        },
        isNumeric: {            
            errorMessage: 'Product stock must be a number'
        }
    },
    categories: {
        optional: true,
        isArray: {            
            errorMessage: 'Product categories must be a array'
        }        
    },
    tags: {
        optional: true,
        isArray: {            
            errorMessage: 'Product tags must be a array'
        }        
    },
    description: {
        optional: true,
        isString: {            
            errorMessage: 'Product description must be a string'
        }        
    },
    info: {
        optional: true,
        isString: {            
            errorMessage: 'Product information must be a string'
        }        
    },
    images: {
        optional: true,
        isArray: {            
            errorMessage: 'Product images must be a array'
        }        
    },
};

export const validateCreateProduct = checkSchema(schema, ['body']);




