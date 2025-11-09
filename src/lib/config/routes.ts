const BASE_PATHS = {
  POSTS: '/posts',
  USERS: '/users',
  AUTH: '/auth',
} as const;

const ROUTES_PATHS = {
  HOME: '/',

  // Posts
  POSTS: {
    ROOT: BASE_PATHS.POSTS,
    LIST: BASE_PATHS.POSTS,
    NEW: `${BASE_PATHS.POSTS}/new`,
    DETAIL: (id: number | string) => `${BASE_PATHS.POSTS}/${id}`,
  },

  // Users
  USERS: {
    ROOT: BASE_PATHS.USERS,
    LIST: BASE_PATHS.USERS,
    NEW: `${BASE_PATHS.USERS}/new`,
    DETAIL: (id: number | string) => `${BASE_PATHS.USERS}/${id}`,
  },

  // Auth
  AUTH: {
    ROOT: BASE_PATHS.AUTH,
    LOGIN: '/login',
  },

  // Error
  NOT_FOUND: '*',
};

export { BASE_PATHS, ROUTES_PATHS };
