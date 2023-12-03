-- Insert sample users
INSERT INTO users (username, password) VALUES
  ('user1', 'hashedpassword1'),
  ('user2', 'hashedpassword2');

-- Insert sample posts
INSERT INTO posts (title, content, userId) VALUES
  ('First Post', 'This is the content of the first post.', 1),
  ('Second Post', 'This is the content of the second post.', 2);

-- Insert sample comments
INSERT INTO comments (text, userId, postId) VALUES
  ('Great post!', 2, 1),
  ('Nice content!', 1, 2),
  ('Interesting thoughts.', 2, 2);

