import API from '@xing.wu/axios';
import { Message } from 'element-ui';
import { globalSettings } from '@/setting';
import store from '@/store';
// 错误处理
const errorHandle = (error) => {
  // 处理错误,尝试获取error的message展示
  try {
    const tmp = JSON.parse(error.message);
    const { message } = tmp;
    Message.error(message);
  } catch (e) {
    Message.error(error.toString());
  }
};

// 设置错误处理
API.setErrorHandle(errorHandle);

// 结果拦截器
API.interceptors.response.use(
  (response) => {
    // 判断状态
    if (response.status === '0') {
      return response.data;
    }
    if (response.status === globalSettings.logonFailureCode) {
      // 清空登录数据并刷新
      store.dispatch('userStore/logonFailure');
      window.location.reload();
    }
    // 否则都是错了
    throw new Error(JSON.stringify(response));
  },
  (error) => {
    throw error;
  },
);

export default {
  getExample: (params) => API.GET('/stastic/getCertNum', params),
  // 登录
  login: (params) => new Promise((resolve) => {
    setTimeout(() => {
      console.log(`登录${JSON.stringify(params)}`);
      resolve({
        szyxtoken: '123',
      });
    });
  }),
  // 获取权限
  getPermissions: (params) => new Promise((resolve) => {
    setTimeout(() => {
      console.log(`获取权限${JSON.stringify(params)}`);
      resolve({
        szyxtoken: '123',
      });
    });
  }),
  // 登录
  loginOut: () => new Promise((resolve) => {
    setTimeout(() => {
      // location.reload();
      resolve();
    }, 1000);
  }),
};
