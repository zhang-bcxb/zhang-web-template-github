const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭 eslint 校验功能
  lintOnSave: false,
  // 默认为【/】，打包的时候改成【./】
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
  devServer: {
    // 处理跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:3300',
        changeOrigin: true, // 允许跨域
        // 重写地址
        pathRewrite: {
          // 发起请求时都要带上 /api 前缀
          // 例如：/api/login => /login
          '^/api': ''
        }
      }
    }
  }
})
