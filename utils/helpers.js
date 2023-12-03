const formatDate = (date) => {
  // Format the date in a user-friendly way (e.g., "January 1, 2023")
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const truncateText = (text, maxLength) => {
  // Truncate text to a specified maximum length
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  }
  return text;
};

module.exports = { formatDate, truncateText };

