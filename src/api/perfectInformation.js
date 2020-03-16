// 完善注册信息
import request from '@/utils/request'



// 按层级获取行政区域省市接口 /admin/a/user/area/list-by-level/{level}
// 根据层级获取行政区域, 0为省级, 1为市级
export function getListByLevel(data) {
  return request({
    url: '/admin/a/user/area/list-by-level/'+ data,
    method: 'get'
    // ,params: data
  })
}

// 按上级id获取下一级区域接口  /admin/a/user/area/list-by-parent-id/{parentId}
export function getListByParentId(data) {
  return request({
    url: '/admin/a/user/area/list-by-parent-id/'+ data,
    method: 'get'
    // ,params: data
  })
}

// 施工资质发放单位接口  localhost:8008/admin/a/user/dictionary/list/typeid/1
export function getDictionaryList1(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/'+ 1,
    method: 'get'
    // ,params: data
  })
}

// 施工资质证书等级接口  localhost:8008/admin/a/user/dictionary/list/typeid/2
export function getDictionaryList2(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/'+ 2,
    method: 'get'
    // ,params: data
  })
}

// 施工能力等级评价证书接口  localhost:8008/admin/a/user/dictionary/list/typeid/3
export function getDictionaryList3(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/'+ 3,
    method: 'get'
    // ,params: data
  })
}

// 注册信息审核不通过原因接口  localhost:8008/admin/a/user/dictionary/list/typeid/4
export function getDictionaryList4(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/'+ 4,
    method: 'get'
    // ,params: data
  })
}

// 阿里云上传服务端签名接口  
export function getAliyunOssSign(data) {
  return request({
    // url: '/admin/a/user/aliyun/oss/sign',
    url: '/admin/a/user/aliyun/oss/sign-client',
    method: 'get',
    params: data
  })
}
// ++++++++++++++++客户公司端+++++++++++++++++++++ 
// 获取企业信息, 未登录时  /admin/a/user/customer/detail-by-name
export function getCustomerDetailByName(data) {
  return request({
    url: '/admin/a/user/customer/detail-by-name',
    method: 'post',
    data
  })
}

// 完善资料-提交  
export function subUserCustomerComplete(data) {
  return request({
    url: '/admin/a/user/customer/complete',
    method: 'post',
    data
  })
}

// 获取企业信息   根据当前登录用户获取企业信息, 只适用于已登录用户 
export function getCustomerDetailByLoginUser(data) {
  return request({
    url: '/admin/a/user/customer/detail-by-login-user',
    method: 'post',
    data
  })
}

// 我的账户首页-审核通过-提交   /admin/a/user/customer/change
export function subCustomerDetailByLoginUser(data) {
  return request({
    url: '/admin/a/user/customer/detail-by-login-user',
    method: 'post',
    data
  })
}


