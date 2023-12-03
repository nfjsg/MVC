const { Post, User, Comment } = require('../../models');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      // Retrieve all posts with associated user and comment data
      const posts = await Post.findAll({
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, attributes: ['text', 'createdAt'], include: [{ model: User, attributes: ['username'] }] },
        ],
      });

      // Send the posts as a JSON response
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getPostById: async (req, res) => {
    try {
      // Retrieve a single post by its ID with associated user and comment data
      const postId = req.params.id;
      const post = await Post.findByPk(postId, {
        include: [
          { model: User, attributes: ['username'] },
          { model: Comment, attributes: ['text', 'createdAt'], include: [{ model: User, attributes: ['username'] }] },
        ],
      });

      // If the post is not found, return a 404 status
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }

      // Send the post as a JSON response
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Other controller methods for creating, updating, and deleting posts go here
};

module.exports = postController;

