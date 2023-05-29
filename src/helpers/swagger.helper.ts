import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Children\'s Shop Api',
        version: '1.0.0',
      }, 
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        }
      }        
    },
    apis: ["./src/routes/*.ts"],
};
export const specs = swaggerJsdoc(options);