const express = require('express');
require('dotenv').config();
require('module-alias/register');
const connectDB = require('./src/connection/db');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swagger/swaggerConfig');


const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
connectDB();
// Routes
const { allRoutes } = require('@routes');
const logger = require('@middlewares/logger');
// Single line to use all routes
app.use('/api',logger, allRoutes);

// List all endpoints// List all endpoints on GET /docs
// Swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
