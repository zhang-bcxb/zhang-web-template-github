// 修改 Token 的操作
export default {
  // 登录
  LOGIN_IN(state, token) {
    state.UserToken = token;
  },
  // 登出
  LOGIN_OUT(state) {
    state.UserToken = ""
  },
  // 切换
  toggleNavCollapse(state) {
    state.isSidebarNavCollapse = !state.isSidebarNavCollapse
  }
}
