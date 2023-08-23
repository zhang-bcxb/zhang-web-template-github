/* eslint-disable no-unused-vars */
import { cloneDeep } from 'lodash';
// 筛选路由
function filterAsyncRoutes(menu) {
  const res = [];
  menu.forEach((element) => {
    const r = { ...element };
    // 这里是筛选条件,满足什么条件才塞进去,可以是规则,可以是别的什么
    if (!r.meta || !r.meta.sidebarHidden) {
      if (r.children) {
        const tmp = filterAsyncRoutes(r.children);
        // 如果children为0,去掉
        if (tmp.length) {
          r.children = tmp;
        } else {
          r.children = null;
        }
      }
      res.push(r);
    }
  });
  return res;
}

// 筛选路由条件
function filterRules() {}
const state = {
  // 侧边栏
  sidebarRoutes: [],
  // 所有路由
  allRoutes: [],
  // 侧边栏是否收起
  sidebarCollapse: false,
  // 路由的激活项
  active: '',
};

const actions = {
  // 匹配路由
  matchingRoutes({ commit }, data) {
    const result = cloneDeep([...data.defaultRoutes, ...data.asyncRoutes]);
    commit('setAllRoutes', result);
    commit('setActive', cloneDeep(data.currentPath));
    return cloneDeep(data.asyncRoutes);
  },
  // 根据所有路由,匹配可展示的路由,只要有一个节点是非,该节点下所有路由不展示
  matchingSidebarRoutes({ state, commit }) {
    const result = filterAsyncRoutes(cloneDeep(state.allRoutes));
    commit('setSidebarRoutes', result);
  },
};

const mutations = {
  setAllRoutes(state, data) {
    state.allRoutes = data;
  },
  setSidebarRoutes(state, data) {
    state.sidebarRoutes = data;
  },
  setSidebarCollapse(state) {
    state.sidebarCollapse = !state.sidebarCollapse;
  },
  // 设置active
  setActive(state, data) {
    state.active = data;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  localStorage: [],
};
