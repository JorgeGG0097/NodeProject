// src/swaggerConfig.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fitness Tracker API',
            version: '1.0.0',
            description: 'API for managing user routines, exercises, and goals. It enables users to create, update, retrieve, and delete exercise sessions and goals, helping them track and manage their fitness progress and performance over time.'
            ,
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec, swaggerUi };
