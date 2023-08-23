import Vue from 'vue';
import dayjs from 'dayjs';
import hotkeys from 'hotkeys-js';
import ElementUI from 'element-ui';

import App from './App.vue';
import { router } from './router';
import './router/routeHooks';
import store from './store';
import api from './api';

import '@/components/autoRegister';
import '@/styles/index.less';

Vue.config.productionTip = false;

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$hotkeys = hotkeys;
Vue.prototype.$api = api;

Vue.use(ElementUI);
// 鉴于过滤器在Vue3被取消了,这里不再添加过滤器
// eventBus在Vue3被取消,不再使用eventBus
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
