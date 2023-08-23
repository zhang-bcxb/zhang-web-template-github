module.exports = {
  devServer: {
    // 取消对hostname的检查
    disableHostCheck: true,
    // 配置自动打开浏览器，运行项目
    open: true,
    // 端口配置，默认就是8080
    port: 8080,
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:8090/bs', //跨域请求的公共地址
        changeOrigin: true, //是否开启跨域，值为 true 就是开启， false 不开启
        pathRewrite: {
          '^/api': '', //注册全局路径
        },
      },
    },
  },
  // 关闭 eslint 校验功能
  lintOnSave: false,
  // 默认为【/】，打包的时候改成【./】
  publicPath: process.env.NODE_ENV === 'development' ? '/' : './',
}
