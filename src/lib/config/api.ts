const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

const API_ENDPOINTS = {
  POSTS: '/posts',
  USERS: '/users',
} as const;

export { API_BASE_URL, API_ENDPOINTS };
