const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const router = express.Router();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order Management API',
      version: '1.0.0',
      description: 'API for managing orders',
    },
  },
  apis: ['./route/order.route.js'],
};

const specs = swaggerJsdoc(options);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(specs));

module.exports = router;
