const publicRoutes = {
  login: '/login',
} as const;

const menuRoutes = {
  dashboard: '/dashboard',
  MyTodo: '/my_todo',
  SignUp: '/sign_up',
  hoge: '/hoge',
} as const;

export const routeMap = {
  ...publicRoutes,
  ...menuRoutes,
} as const;
