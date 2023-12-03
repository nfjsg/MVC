const express = require('express');
const router = express.Router();

const postController = require('./postController');
const commentController = require('./commentController');
const userController = require('./userController');

// API routes for posts
router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById);

// API routes for comments
router.get('/comments', commentController.getAllComments);
router.post('/comments', commentController.createComment);
// Add more comment routes as needed

// API routes for users
router.post('/users/register', userController.createUser);
router.post('/users/login', userController.loginUser);
router.post('/users/logout', userController.logoutUser);
// Add more user routes as needed

module.exports = router;

