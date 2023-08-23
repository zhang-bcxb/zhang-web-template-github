// axios 二次封装
import axios from 'axios'
import {getToken} from '@/utils/setToken.js'
import {Message} from 'element-ui'

const service = axios.create({
  baseURL: '/api', // baseURL会自动加在请求地址上
  timeout: 3000 // 设置超时时间
})

// 添加请求拦截器
service.interceptors.request.use((config) => {
  // 登录的时候没有 Token，所以不需要
  if ("/login" !== config.url) {
    // 在请求之前做些什么(获取并设置token)
    config.headers['Authorization'] = getToken('token')
  }
  // 返回配置信息
  return config
}, (error) => {
  // 出现网络等异常进行返回
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use((response) => {
  // 对响应数据做些什么
  // 解构响应数据
  let {code, msg} = response.data

  // 响应码不等于 200 就进行信息报错
  if (code !== "200") {
    Message({message: msg || 'error', type: 'warning'})
  }

  // 返回响应数据
  return response
}, (error) => {
  // 出现网络等异常进行返回
  return Promise.reject(error)
})

export default service
