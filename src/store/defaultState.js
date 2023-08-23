// 本地存储 token
export default {
  state: {
    isSidebarNavCollapse: false
  },
  // 获取 token
  get UserToken() {
    return localStorage.getItem('token');
  },
  // 设置 token
  set UserToken(value) {
    localStorage.setItem('token', value)
  }
}
