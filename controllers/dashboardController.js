const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { isAuthenticated } = require('./authController'); // Import the isAuthenticated middleware

// Dashboard route - Display user's blog posts
router.get('/dashboard', isAuthenticated, async (req, res) => {
  try {
    // Retrieve all posts associated with the authenticated user
    const userId = req.session.userId;
    const userPosts = await Post.findAll({ where: { userId } });

    // Render the dashboard view with user's blog posts
    res.render('dashboard', { posts: userPosts }); // Adjust this based on your view setup
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more dashboard-related routes as needed (e.g., add, update, delete posts)

module.exports = router;

