import router from "./index"
import store from "../store/index"

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
    // 未登录  页面是否需要登录
    if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
      // 不需要登录
      next();
    } else {
      // 需要登录
      next({
        path: "/login"
      })
    }
  } else {
    // 用户已经登录  路由的访问权限
    if (!store.state.permission.permissionList) {
      store.dispatch("permission/FETCH_PERMISSION").then(() => {
        next({
          path: to.path
        })
      })
    } else {
      // store存在权限
      if (to.path !== "/login") {
        next();
      } else {
        next(from.fullPath)
      }
    }
  }
})