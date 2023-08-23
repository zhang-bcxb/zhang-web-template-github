import Vue from 'vue'
import App from './App.vue'

// 引入 vue-router
import router from './router'
// 引入 ElementUI 配置文件
import '../plugins/element.js'
// 引入字体图标库
import 'font-awesome/css/font-awesome.min.css'
// 引入 ECharts
import echarts from 'echarts'

// 挂载到原型,可在全局使用
Vue.prototype.$echarts = echarts
// 设置为 false，禁止在生产环境中显示开发模式提示
Vue.config.productionTip = false

new Vue({
  // 在渲染之前挂载路由
  router,
  render: h => h(App),
}).$mount('#app')

