const express = require('express');
const router = express.Router();

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // User is authenticated, proceed to the next middleware or route
    return next();
  } else {
    // User is not authenticated, redirect to login page or send an error response
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

// Routes related to authentication
router.get('/login', (req, res) => {
  // Render the login page
  res.render('login'); // Adjust this based on your view setup
});

router.get('/logout', (req, res) => {
  // Destroy the session to log out the user
  req.session.destroy(() => {
    res.redirect('/'); // Redirect to the homepage or login page
  });
});

// Add more authentication routes as needed

module.exports = { router, isAuthenticated };

