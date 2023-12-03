// public/js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Event listener for the DOM content being fully loaded
  console.log('DOM content loaded');

  // Example: Fetching and displaying blog posts from the server
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch blog posts');
      }

      const data = await response.json();

      // Update the UI with the fetched blog posts
      displayPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error.message);
    }
  };

  // Example: Displaying blog posts on the UI
  const displayPosts = (posts) => {
    const postsContainer = document.getElementById('posts-container');

    // Clear previous content
    postsContainer.innerHTML = '';

    // Render each blog post
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const titleElement = document.createElement('h2');
      titleElement.textContent = post.title;

      const contentElement = document.createElement('p');
      contentElement.textContent = post.content;

      postElement.appendChild(titleElement);
      postElement.appendChild(contentElement);

      postsContainer.appendChild(postElement);
    });
  };

  // Fetch blog posts when the DOM is fully loaded
  fetchPosts();
});

