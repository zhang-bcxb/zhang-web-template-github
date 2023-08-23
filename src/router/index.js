import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from "../pages/login"
import Home from "../pages/home"
import NotFound from "../pages/errorPage/404"
import Forbidden from "../pages/errorPage/403"
import Layout from "../pages/layout"

Vue.use(VueRouter)

// 初始化路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

// 据用户的权限不同，所能看到的页面和可操作性也不同
// 准备动态加载的路由
export const DynamicRoutes = [
  {
    path: "",
    component: Layout,
    name: 'container',
    // 重定向到首页
    redirect: "home",
    meta: {
      // 是否需要认证，需要登录才能访问
      requiresAuth: true,
      name: "首页"
    },
    // 动态添加路由的位置
    children: [
      {
        path: "home",
        component: Home,
        name: "home",
        meta: {
          // 匹配规则
          name: "首页",
          icon: "icon-name"
        }
      }
    ]
  },
  {
    path: "/403",
    component: Forbidden
  },
  {
    path: "*",
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
