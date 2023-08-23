const env = process.env.NODE_ENV

// console.log(env)

const myConfig = {
  development: {
    baseUrl: "/data"
  },
  production: {
    baseUrl: "http://localhost:3300"
  }
}

export default {
  baseUrl: myConfig[env].baseUrl
}

/**
 * 跨域处理两种方案
 * 后端处理【cors】
 * 前端代理【proxy:开发环境】
 */
