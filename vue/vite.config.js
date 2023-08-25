import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  const config = loadEnv(mode, './')
  // console.log(config)
  // console.log(path.resolve(__dirname, "src", config.VITE_API_SRC))
  return {
    plugins: [vue()],
    // 配置项目根路径别名
    resolve: {
      alias: {
        // "~": path.resolve(__dirname, "src"),
        // "@api": path.resolve(__dirname, "src", config.VITE_API_SRC)
      }
    },
    server: {
      // 项目启动时是否打开页面
      open: false, 
      // 项目启动时的端口号
      port: '9080', 
      // 解决跨域问题
      proxy: {
        '/api': {
          //跨域请求的公共地址
          target: 'http://example.com',
          //是否开启跨域，值为 true 就是开启， false 不开启
          changeOrigin: true,
          //注册全局路径
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      }
    }
  }
})