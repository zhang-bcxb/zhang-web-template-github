import LayoutMain from '@/layouts/LayoutMain/index.vue';

const todoListRoute = {
  meta: {
    icon: 'el-icon-ali-wode',
    title: '待办事项',
  },
  path: '/todoList',
  name: 'todoList',
  redirect: '/todoList/page',
  component: LayoutMain,
  children: [
    {
      meta: {
        title: '待办事项首页',
        sidebarHidden: true,
        activeMenu: '/todoList',
        breadcrumb: false,
      },
      path: 'page',
      name: 'todoListPage',
      component: () => import('@/views/TodoList/index.vue'),
    },
  ],
};
export default todoListRoute;
