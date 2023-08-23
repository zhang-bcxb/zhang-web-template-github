// 项目中我们大多数时候都会把对应的接口请求封装成api来调用
import service from '../utils/service.js'
import qs from 'qs'

/******************************【登录 & 注册】******************************/
// 登录接口
export function login(data) {
  return service({
    method: 'post',
    url: '/sys/user/login',
    data
  })
}

// 注册接口
export function register(data) {
  return service({
    method: 'post',
    url: '/sys/user/register',
    data
  })
}

/******************************【用户管理】******************************/
// 用户分页
export function getPage(data) {
  return service({
    method: 'get',
    url: '/sys/user/getPage?' + qs.stringify(data),
  })
}

// 根据用户ID查询
export function getById(data) {
  return service({
    method: 'get',
    url: '/sys/user/getById?' + qs.stringify(data),
  })
}

// 更新用户状态
export function updateStatus(data) {
  return service({
    contentType: 'application/json',
    method: 'post',
    url: '/sys/user/updateStatus',
    data
  })
}

// 管理员创建用户
export function save(data) {
  return service({
    contentType: 'application/json',
    method: 'post',
    url: '/sys/user/admin',
    data
  })
}

// 更新
export function updateById(data) {
  return service({
    contentType: 'application/json',
    method: 'post',
    url: '/sys/user/updateById',
    data
  })
}

// 删除
export function removeById(data) {
  return service({
    contentType: 'application/json',
    method: 'delete',
    url: '/sys/user/removeById',
    data
  })
}
