import Vue from 'vue'
import VueRouter from 'vue-router'
import {initRouter, adminRouter, userRouter} from './router-all.js'

Vue.use(VueRouter)

const routes = [
  ...initRouter,
  //...adminRouter,
  //...userRouter,
]

/*
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})
*/

// 解决重复添加路由问题
const createRouter = () => new VueRouter({
  mode: 'history',
  routes: routes
})
const router = createRouter()

// 重置路由
function resetRouter() {
  // 创建一个新的路由实例
  const newRouter = createRouter()
  // 将新路由实例的匹配器（matcher）赋值给旧路由实例的匹配器
  router.matcher = newRouter.matcher
}


// 刷新 flag 会进行重置
let flag = false
// 每一次路由跳转都会执行一次
router.beforeEach((to, from, next) => {

  if (to.meta.title) { //判断是否有标题
    document.title = "英语学习网站-" + to.meta.title //给相应页面添加标题
  }

  // 获取 token  没有获取到，token为空值
  let rolename = localStorage.getItem('rolename')

  console.log(flag)

  if (!flag && rolename) {
    // 动态添加路由
    console.log("设置路由")
    flag = true
    const addRouter = rolename === 'admin' ? adminRouter : userRouter

    // 重置路由，此时只有初始化路由
    resetRouter()
    let routes = router.options.routes
    // console.log(routes)
    // 添加路由
    routes.push(...addRouter)
    // 排除重复的路由
    routes.forEach(route => {
      if (!initRouter.includes(route)) {
        router.addRoute(route)
      }
    })
    // console.log(routes)
    next(to.path)
  }

  // console.log(routes)
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 函数，表示放行
  // next() 放行  next('/login') 强制跳转
  if (to.path === '/login' || to.path === '/register') {
    if (!rolename) {
      // 没有角色名称
      return next()
    } else {
      // 拥有角色名称，默认跳转
      if (rolename == "admin") {
        return next('/admin')
      } else if (rolename == "user") {
        return next('/user')
      }
    }
  }

  // 如果没有角色名称，就跳转到登录页面
  if(!rolename) {
    return next('/')
  }

  next()
})


// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// 针对 push 方法
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// 针对 replace 方法
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

export default router;
