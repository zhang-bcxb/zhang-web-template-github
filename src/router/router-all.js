export const initRouter = [
  {
    path: '/',
    redirect: '/login', // 访问根路径的时候重定向到 login
    meta: {
      hidden: true,
      title: "单词学习网站"
    },
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hidden: true,
      title: "登录"
    },
    component: () => import('@/views/Login') // 路由懒加载
  },
  {
    path: '*',
    name: 'NotFound',
    meta: {
      hidden: true,
      title: "404 页面"
    },
    component: () => import('@/views/NotFound') // 路由懒加载
  }
]

export const userRouter = [
  {
    path: '/user',
    name: 'UserHome',
    meta: {
      title: "英语单词学习网站",
      iconClass: 'fa fa-bar-chart',
      hidden: false,
    },
    component: () => import('@/views/user/home/Home'),
    redirect: '/user/welcome',
    children: [
      {
        path: '/user/welcome',
        name: 'UserWelcome',
        meta: {
          title: "学习首页",
          iconClass: 'fa fa-telegram',
          hidden: false,
        },
        component: () => import('@/views/user/Welcome'),
      },
      {
        path: '/user/test',
        name: 'UserTest',
        meta: {
          title: "用户测试",
          iconClass: 'fa fa-telegram',
          hidden: false,
        },
        component: () => import('@/views/user/UserTest'),
      }
    ]
  }
]

export const adminRouter = [
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      title: "后台首页",
      iconClass: 'fa fa-bar-chart',
      hidden: false,
    },
    component: () => import('@/views/admin/home/Home'),
    redirect: '/admin/welcome',
    children: [
      {
        path: '/admin/welcome',
        name: 'AdminWelcome',
        meta: {
          title: "后台首页",
          iconClass: 'fa fa-telegram',
          hidden: false,
        },
        component: () => import('@/views/admin/Welcome')
      },
      {
        path: '/admin/test',
        name: 'AdminTest',
        meta: {
          title: "管理员测试",
          iconClass: 'fa fa-telegram',
          hidden: false,
        },
        component: () => import('@/views/admin/AdminTest')
      }
    ]
  },
  ...userRouter
]


