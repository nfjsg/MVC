const { Comment } = require('../../models');

const commentController = {
  // Your controller methods go here
  getAllComments: async (req, res) => {
    try {
      // Retrieve all comments from the database
      const comments = await Comment.findAll();

      // Send the comments as a JSON response
      res.json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createComment: async (req, res) => {
    try {
      // Extract comment data from the request body
      const { postId, text } = req.body;

      // Create a new comment in the database
      const newComment = await Comment.create({
        postId,
        text,
        // Assuming you have a userId associated with the comment
        userId: req.session.userId, // Use the authenticated user's ID
      });

      // Send the newly created comment as a JSON response
      res.json(newComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Add more methods as needed for updating and deleting comments
};

module.exports = commentController;

