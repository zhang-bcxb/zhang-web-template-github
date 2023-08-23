import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);
const modules = {};
const modulePluginPaths = [];
const requireModule = require.context('./modules', false, /.js$/);
requireModule.keys().forEach((fileName) => {
  modules[fileName.slice(2, -3)] = requireModule(fileName).default;
  // 如果存在且大于0
  if (requireModule(fileName).default.localStorage?.length > 0) {
    requireModule(fileName).default.localStorage.forEach((item) => {
      modulePluginPaths.push(`${fileName.slice(2, -3)}.${item}`);
    });
  }
});

const store = new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState({
      paths: modulePluginPaths,
    }),
  ],
});

export default store;
