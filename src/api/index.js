// axios 请求处理
import axios from "../utils/http"
import store from "../store"

// 权限请求
export function fetchPermission() {
  // return axios.get("/api/permission?user=" + store.state.UserToken);
  return axios.get(`/${store.state.UserToken}_permission.json`)
}

// 登录请求
export function login(user) {
  // return axios.get("/api/login?user=" + user)
  // user 的值为：admin 和 vip
  return axios.get(`/${user}_login.json`)
}
