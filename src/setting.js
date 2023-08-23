const globalSettings = {
  //   版权信息配置
  copyrightOptions: {
    date: '2020',
    company: '阿星',
    webSite: 'https://blog.xingxiaowu.cn/',
  },
  siteName: '阿星的模板',
  // 登录失效的错误码
  logonFailureCode: '',
  // 使用logo或者iconfont或者none
  logoType: 'iconfont',
  // 使用iconFont的值
  logoIconName: 'el-icon-ali-404-1',
};
// 因为vue.config.js会读这个文件,所以使用exports写法
exports.globalSettings = globalSettings;
