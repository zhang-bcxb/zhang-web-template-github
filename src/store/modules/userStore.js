const state = {
  // 账号
  account: '',
  // token
  token: '',
  // 失效时间
  // 是否获取过权限
  permissionInit: false,
  // 权限列表
  permissions: [],
  // test: '',
};

const actions = {
  // 获取权限
  getPermissions({ commit }) {
    // 获取权限
    commit('setPermissionInit', true);
    commit('setPermissions', []);
  },
  // 登录失效
  logonFailure({ commit }) {
    commit('setToken', '');
    commit('setPermissionInit', false);
    commit('setPermissions', []);
  },
  // // 获取路由权限
  // generateRoutes({ commit }, data) {
  //   return new Promise((resolve) => {
  //     const { allRoutes } = data;
  //     commit('setAllRoutes', allRoutes);
  //     commit('setSidebarActive', data.currentPath);
  //     resolve(allRoutes);
  //   });
  // },
  // afterLogout() {},
  // setTest({ commit }, data) {
  //   commit('setTest', data);
  // },
};

const mutations = {
  // 初始化权限
  setPermissionInit(state, data) {
    state.permissionInit = data;
  },
  // 设置权限列表
  setPermissions(state, data) {
    state.permissions = data;
  },
  setAccount(state, data) {
    state.account = data;
  },
  setToken(state, data) {
    state.token = data;
  },
  // setTest(state, data) {
  //   state.test = data;
  // },
  // setAllRoutes(state, routes) {
  //   state.permissionInit = true;
  //   state.allRoutes = cloneDeep(routes);
  // },
  // setSidebarActive(state, currentPath) {
  //   // eslint-disable-next-line array-callback-return
  //   state.allRoutes.map((item, index) => {
  //     if (
  //       item.children
  //       && item.children.some((child) => currentPath.indexOf(`${child.path}/`) === 0)
  //     ) {
  //       state.sidebarActive = index;
  //     }
  //   });
  //   state.sidebarRoutes = state.allRoutes[state.sidebarActive].children;
  // },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  // 需要存到localStorage的状态
  localStorage: ['account', 'token'],
};
