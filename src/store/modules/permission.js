import {fetchPermission} from "../../api/index"
import router, {DynamicRoutes} from "../../router/index"
import dynamicRouter from "../../router/dynamic-router"
import {recursionRouter, setDefaultRoute} from "../../utils/recursion-router"

export default {
  // 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
  // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  namespaced: true,
  state: {
    permissionList: null,
    sidebarMenu: [],// 导航菜单
    currentMenu: '' // 当前菜单【高亮】
  },
  getters: {},
  mutations: {
    // 设置权限
    SET_PERMISSION(state, routes) {
      state.permissionList = routes;
    },
    // 清除权限
    CLEAR_PERMSSION(state) {
      state.permissionList = null;
    },
    // 设置菜单
    SET_MENU(state, menu) {
      state.sidebarMenu = menu;
    },
    // 清除菜单
    CLEAR_MENU(state) {
      state.sidebarMenu = []
    }
  },
  // 异步访问
  actions: {
    async FETCH_PERMISSION({commit, state}) {
      let permissionList = await fetchPermission();
      // 筛选
      let routes = recursionRouter(permissionList, dynamicRouter);
      // 将符合条件的数据添加到动态路由容器中
      let MainContainer = DynamicRoutes.find(v => v.path === "");
      let children = MainContainer.children;
      children.push(...routes)

      // 生成菜单
      commit("SET_MENU", children);

      // 设置默认路由
      setDefaultRoute([MainContainer]);
      // 初始化路由
      let initialRoutes = router.options.routes;
      router.addRoutes(DynamicRoutes);
      commit("SET_PERMISSION", [...initialRoutes, ...DynamicRoutes])
    }
  }
}