/**
 * 方法一：比对路由权限
 * 方法二：指定返回的默认路由
 */

/**
 * 比对路由权限
 * @param userRouter 后台返回的路由权限【JSON】
 * @param allRouter 前端配置好的路由权限数据
 * @returns {[]}
 */
export function recursionRouter(userRouter = [], allRouter = []) {
  // realRoutes 过滤之后的符合条件的路由
  let realRoutes = [];
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      // 如果 name 相等
      if (item.name === v.meta.name) {
        // item 还有子节点（递归）
        if (item.children && item.children.length > 0) {
          v.children = recursionRouter(item.children, v.children);
        }
        realRoutes.push(v)
      }
    })
  })
  return realRoutes;
}

/**
 * 指定返回的默认路由
 * @param routes
 */
export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = {name: v.children[0].name}
      setDefaultRoute(v.children);
    }
  })
}