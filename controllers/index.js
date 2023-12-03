const express = require('express');
const router = express.Router();

const homeController = require('./homeController');
const dashboardController = require('./dashboardController');
const authController = require('./authController');
const apiController = require('./api'); // Assuming you have an 'api' directory with related controllers

// Use the controllers in your routes
router.use('/', homeController);
router.use('/', authController);
router.use('/', dashboardController);
router.use('/api', apiController); // Mount API routes under '/api'

module.exports = router;

