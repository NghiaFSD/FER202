export const fetchUser = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!response.ok) throw new Error('Unable to fetch user');
  return response.json();
};

export const fetchPost = async (postId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  if (!response.ok) throw new Error('Unable to fetch post');
  return response.json();
};
