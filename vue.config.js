/* eslint-disable no-param-reassign */
const path = require('path');
const { globalSettings } = require('./src/setting');

module.exports = {
  publicPath: './',
  // 保存时lint,错误无法展示
  lintOnSave: 'default',
  // 是否生成map
  productionSourceMap: false,
  // 添加重命名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve('src'),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = globalSettings.siteName;
        // if (isCDN) {
        //   args[0].cdn = cdn;
        // }
        // args[0].debugTool = process.env.VUE_APP_DEBUG_TOOL;
        // args[0].appType = process.env.VUE_APP_TYPE;
        return args;
      });
  },
  // css解析
  css: {
    loaderOptions: {
      less: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.less`
        additionalData: '@import "@/styles/variables.less";',
      },
    },
  },
  devServer: {
    open: true,
    // 开发环境默认开启反向代理，如果不需要请自行注释
    proxy: {
      '/': {
        target: 'http://www.baidu.com/',
        changeOrigin: true,
      },
    },
  },
};
