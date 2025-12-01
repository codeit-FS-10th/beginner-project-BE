// src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: '공부의 숲 API',
    version: '0.9',
    description: '스터디, 포인트, 습관, 집중, 이모지 API 명세',
  },
  servers: [
    {
      url: 'http://localhost:4000',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi };
