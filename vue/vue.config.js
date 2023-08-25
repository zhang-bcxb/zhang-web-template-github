const { defineConfig } = require('@vue/cli-service')
// console.log(process.env)
// 判断是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'
// 如何是生产环境，需要执行以下逻辑
if (isProduction) {
  // 编写生产环境逻辑
}
module.exports = defineConfig({
  // 避免构建后的代码中出现未转译的第三方依赖
  transpileDependencies: true,
  // 关闭 eslint 校验功能
  lintOnSave: false,
  // 项目路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // webpack-dev-server 相关配置
  devServer: {
    // 取消对hostname的检查
    disableHostCheck: true,
    // 项目启动时是否打开页面
    open: false,
    // 修改运行端口
    port: 8888,
    // 配置代理
    proxy: {
      '/api': {
        //跨域请求的公共地址
        target: 'http://example.com', 
        //是否开启跨域，值为 true 就是开启， false 不开启
        changeOrigin: true, 
        //注册全局路径
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  }
})
