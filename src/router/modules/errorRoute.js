const errorRoute = {
  path: '*',
  name: '404',
  component: () => import('@/views/404'),
  meta: {
    title: '404',
    // 侧边栏是否隐藏
    sidebarHidden: true,
  },
};
export default errorRoute;
