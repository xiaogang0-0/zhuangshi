// 人员数据库
import request from '@/utils/request'
// 人员列表    /admin/a/manager/emp/search
export function getPersonnelSearch(data) {
  return request({
    url: '/admin/a/user/emp/search',
    method: 'post',
    data
  })
}

// 移到历史  /admin/a/manager/emp/udpateIsWork
export function subEmpUdpateIsWork(data) {
  return request({
    url: '/admin/a/user/emp/udpateIsWork',
    method: 'post',
    data
  })
}

// 获取人员详细信息接口  /admin/a/manager/emp/getDetail
export function getEmpDetail(data) {
  return request({
    url: '/admin/a/user/emp/getDetail',
    method: 'post',
    data
  })
}

// 人员资质发证机构接口  /admin/a/user/dictionary/list/typeid/5
export function getDictionaryListTypeid5() {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/5',
    method: 'get'
    // params: data
  })
}

// 人员资质等级接口
export function getDictionaryListTypeid6() {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/6',
    method: 'get'
    // params: data
  })
}

// 身份信息列表  /admin/a/user/dictionary/list/typeid/9
export function getDictionaryListTypeid9(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/9',
    method: 'get'
    // params: data
  })
}

// 工种接口
export function getDictionaryListTypeid7(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/7',
    method: 'get'
    // params: data
  })
}
// 分配身份接口
export function getDictionaryListTypeid8(data) {
  return request({
    url: '/admin/a/user/dictionary/list/typeid/8',
    method: 'get'
    // params: data
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

// 根据身份证号码获取人员主信息   /admin/a/user/emp/{idNum}
export function getUserEmp(data) {
  return request({
    url: '/admin/a/user/emp/' + data,
    method: 'get'
    // params: data
  })
}

// 新增人员  /admin/a/user/emp/addEmp
export function subUserEmpAddEmp(data) {
  return request({
    url: '/admin/a/user/emp/addEmp',
    method: 'post',
    data
  })
}

// 人员库修改接口 /admin/a/user/emp/udpateEmpOrther
export function subUserEmpUdpateEmpOrther(data) {
  return request({
    url: '/admin/a/user/emp/udpateEmpOrther',
    method: 'post',
    data
  })
}
