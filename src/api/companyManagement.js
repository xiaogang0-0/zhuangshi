// 编辑注册资料
import request from '@/utils/request'
// 公司管理列表
export function getUserCustomerSearch(data) {
  return request({
    url: '/admin/a/user/customer/search',
    method: 'post',
    data
  })
}

// 修改示范工地接口 /admin/a/user/customer/updateCustomerDemoSite
export function setUpdateCustomerDemoSite(data) {
  return request({
    url: '/admin/a/user/customer/updateCustomerDemoSite',
    method: 'post',
    data
  })
}

// 注册资料审核列表 /admin/a/manager/customer_update_record/search
export function getCustomerUpdateRecordSearch(data) {
  return request({
    url: '/admin/a/manager/customer_update_record/search',
    method: 'post',
    data
  })
}

// 公司管理-获取基本信息   /admin/a/manager/customer/get-by-id/{customerId}
export function getCustomerGetById(data) {
  return request({
    url: '/admin/a/manager/customer/get-by-id/' + data,
    method: 'get'
    // params: data
  })
}

// 注册信息审核不通过原因接口  /admin/a/user/dictionary/list/typeid/4
export function getListTypeid4() {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/4',
    method: 'get'
    // params: data
  })
}

// 公司信息审核接口
export function subCustomerAudit(data) {
  return request({
    url: '/admin/a/user/customer/audit',
    method: 'post',
    data
  })
}

// 注册资料审核-获取详情页接口  /admin/a/manager/customer_update_record/detail
export function getCustomerUpdateRecordDetail(data) {
  return request({
    url: '/admin/a/manager/customer_update_record/detail',
    method: 'post',
    data
  })
}

// 注册资料审核接口  /admin/a/manager/customer_update_record/audit
export function subCustomerUpdateRecordAudit(data) {
  return request({
    url: '/admin/a/manager/customer_update_record/audit',
    method: 'post',
    data
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

// 按层级获取行政区域省市接口 /admin/a/user/area/list-by-level/{level}
// 根据层级获取行政区域, 0为省级, 1为市级
export function getListByLevel(data) {
  return request({
    url: '/admin/a/user/area/list-by-level/' + data,
    method: 'get'
    // ,params: data
  })
}

// 按上级id获取下一级区域接口  /admin/a/user/area/list-by-parent-id/{parentId}
export function getListByParentId(data) {
  return request({
    url: '/admin/a/user/area/list-by-parent-id/' + data,
    method: 'get'
    // ,params: data
  })
}

// 施工资质发放单位接口  localhost:8008/admin/a/user/dictionary/list/typeid/1
export function getDictionaryList1(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/' + 1,
    method: 'get'
    // ,params: data
  })
}

// 施工资质证书等级接口  localhost:8008/admin/a/user/dictionary/list/typeid/2
export function getDictionaryList2(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/' + 2,
    method: 'get'
    // ,params: data
  })
}

// 施工能力等级评价证书接口  localhost:8008/admin/a/user/dictionary/list/typeid/3
export function getDictionaryList3(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/' + 3,
    method: 'get'
    // ,params: data
  })
}

// 注册信息审核不通过原因接口  localhost:8008/admin/a/user/dictionary/list/typeid/4
export function getDictionaryList4(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/' + 4,
    method: 'get'
    // ,params: data
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

// 我的账户首页-审核通过-提交  /admin/a/user/customer/change
export function subUserCustomerChange(data) {
  return request({
    url: '/admin/a/user/customer/change',
    method: 'post',
    data
  })
}
