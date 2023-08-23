import Vue from 'vue';
import Router from 'vue-router';
import errorRoute from '@/router/modules/errorRoute';
import moreRoute from '@/router/modules/moreRoute';
import todoListRoute from '@/router/modules/todoListRoute';
import LayoutMain from '@/layouts/LayoutMain/index.vue';

Vue.use(Router);
// 默认路由数组

// meta:{
//   icon:'',       //iconfont,目前用于侧边栏展示
//   title: '',     //title,用于路由展示
//   sidebarHidden: true,   //是否在侧边栏展示
//   activeMenu: '/todoList', //侧边栏和导航激活目标路由
//   breadcrumb: false,     //是否展示在面包屑导航中
// }
const defaultRoutes = [
  {
    meta: {
      title: '登录',
      // 不展示在侧边栏
      sidebarHidden: true,
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/index.vue'),
  },
  {
    meta: {
      sidebarHidden: true,
    },
    path: '/',
    redirect: '/home',
    component: LayoutMain,
    children: [
      {
        meta: {
          title: '控制台',
        },
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
];
// 存在变化路由数组,errorRoute必须放在最后面
const asyncRoutes = [moreRoute, todoListRoute, errorRoute];

// 新建路由
const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: defaultRoutes,
});

const router = createRouter();

// 重置路由,参考链接 https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch((err) => err);
};

export {
  createRouter, defaultRoutes, asyncRoutes, router, resetRouter,
};
