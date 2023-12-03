const express = require('express');
const router = express.Router();
const { Post } = require('../models');

// Homepage route - Display existing blog posts
router.get('/', async (req, res) => {
  try {
    // Retrieve all blog posts from the database
    const allPosts = await Post.findAll();

    // Render the homepage view with existing blog posts
    res.render('home', { posts: allPosts }); // Adjust this based on your view setup
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add more homepage-related routes as needed

module.exports = router;

