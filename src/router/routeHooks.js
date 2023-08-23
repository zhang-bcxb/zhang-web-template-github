// 路由守卫
import NProgress from 'nprogress';
import store from '@/store/index';
import { cloneDeep } from 'lodash';
import {
  router, resetRouter, defaultRoutes, asyncRoutes,
} from './index';
import 'nprogress/nprogress.css';
// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 没登录
  if (!store.state.userStore.token) {
    if (to.name !== 'login') {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      });
    } else {
      next();
    }
  }
  // 已经登录并初始化完了
  if (store.state.userStore.token && store.state.userStore.permissionInit) {
    // 设置active
    let active = to.path;
    if (to.meta && to.meta.activeMenu) {
      active = to.meta.activeMenu;
    }
    store.commit('routerStore/setActive', active);
    next();
  }
  // 已经登录但没初始化权限
  if (store.state.userStore.token && !store.state.userStore.permissionInit) {
    // 登录了没有初始化过权限
    // 初始化权限
    store.dispatch('userStore/getPermissions');
    // 重置路由
    resetRouter();
    // 初始化路由
    // 设置active
    let active = to.path;
    if (to.meta && to.meta.activeMenu) {
      active = to.meta.activeMenu;
    }
    const tmpAsyncRoutes = await store.dispatch('routerStore/matchingRoutes', {
      defaultRoutes,
      asyncRoutes,
      currentPath: active,
    });
    router.addRoutes(cloneDeep(tmpAsyncRoutes));
    // 初始化侧边栏路由
    store.dispatch('routerStore/matchingSidebarRoutes');
    next({ ...to, replace: true });
  }
  NProgress.done();
});
