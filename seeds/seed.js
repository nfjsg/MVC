
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  const users = await User.bulkCreate([
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
  ]);

  // Seed posts
  const posts = await Post.bulkCreate([
    { title: 'First Post', content: 'Content of the first post.', userId: users[0].id },
    { title: 'Second Post', content: 'Content of the second post.', userId: users[1].id },
  ]);

  // Seed comments
  await Comment.bulkCreate([
    { text: 'Great post!', userId: users[1].id, postId: posts[0].id },
    { text: 'Nice content!', userId: users[0].id, postId: posts[1].id },
    { text: 'Interesting thoughts.', userId: users[1].id, postId: posts[1].id },
  ]);

  process.exit(0);
};

seedDatabase();
