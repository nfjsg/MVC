const { User } = require('../../models');
const bcrypt = require('bcrypt');

const userController = {
  createUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Hash the password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const newUser = await User.create({
        username,
        password: hashedPassword,
      });

      // Remove the hashed password from the response
      newUser.password = undefined;

      // Send the new user as a JSON response
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Find the user in the database by username
      const user = await User.findOne({ where: { username } });

      // If the user is not found, return a 401 status
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Check if the provided password matches the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If the passwords don't match, return a 401 status
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Remove the hashed password from the response
      user.password = undefined;

      // Set user information in the session
      req.session.userId = user.id;

      // Send the authenticated user as a JSON response
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  logoutUser: (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy(() => {
      res.json({ message: 'Logout successful' });
    });
  },

  // Add more methods as needed for updating and deleting users
};

module.exports = userController;

