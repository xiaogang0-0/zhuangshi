// 财务管理
import request from '@/utils/request'



// 财务管理 - 付款查询列表 
export function financeManage_search(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/search/payment',
    method: 'post',
    data
  })
}

// 发票管理-发票详情信息
export function financeManage_searchDetail(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/getPayment/'+ data,
    // url: '/order-center/order/a/payment-manager/siw/withTaxReceipt/'+ data,
    method: 'get'
    // ,params: data
  })
}

// 收款凭证录入 - 新增收款单
export function invoicerrManager_saveInvoice (data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/savPayment',
    method: 'post',
    data
  })
}

// SIW 财务管理-收款订单关联/收款单税票关联详情
export function orderCorrelation_details(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/withTaxReceiptDetails/'+ data,
    // url: '/order-center/order/a/payment-manager/siw/withTaxReceipt/'+ data,
    method: 'get'
    // ,params: data
  })
}

// SIW 财务管理-收款订单关联-税票关联
export function orderCorrelation_InvoiceCorrelationDetail(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/withTaxReceipt/'+ data,
    method: 'get'
  })
}
// SIW 财务管理-收款订单关联-税票关联 确认已付款
export function orderCorrelation_InvoiceCorrelationSub(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/confirmPayment',
    method: 'post',
    data
  })
}


// 采购商名称列表  发票抬头(列表)
export function invoicerrManager_InvoiceRiseList(data) {
  return request({
    // url: '/hlwl-biw-rfq/rfq/vendor/pagelist',
    url: '/hlwl-biw-rfq/rfq/vendor/pagelistForCustomer',
    method: 'post',
    data
  })
}

// 获取物流公司列表接口
export function getLogisticsCompany() {
  return request({
    url: '/goods-center/goods/sys/goods/dictionary/list/'+ 1028,
    method: 'get'
    // ,params: data
  })
}

// 财务收款-列表查询
export function financeManage_searchMake(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/search/make',
    method: 'post',
    data
  })
}

// 上传图片（单传）
export function fileUploadBase64(data) {
  return request({
    url: '/biw-rfq/rfq/sys/file/uploadBase64',
    method: 'post',
    data
  })
}

// 财务收款-批量收款
export function financeManage_receivables(data) {
  return request({
    url: '/order-center/order/a/payment-manager/siw/saveMake',
    method: 'post',
    data
  })
}

// 发票邮寄--发票抬头/采购商名 查询可以创建开票/付款的 采购商信息  
export function invoicerrManager_orderInfo(data) {
  return request({
    url: '/order-center/order/a/order-manager/siw/orderInfo',
    method: 'post',
    data
  })
}

// 发票查询-- 查询可以创建开票/付款的 采购商信息 
export function invoiceInquiryCanCreate_orderInfo(data) {
  return request({
    url: '/order-center/order/a/invoice-manager/siw/search/shipInvoice',
    method: 'post',
    data
  })
}





















// ===================待删除=====================

// 发票管理-创建发票 
// export function invoicerrManager_creation(data) {
//   return request({
//     url: '/order-center/order/a/invoice-manager/siw/saveInvoice',
//     method: 'post',
//     data
//   })
// }

// // 创建发票
// export function invoicerrManager_saveInvoice(data) {
//   return request({
//     url: '/order-center/order/a/invoice-manager/siw/saveInvoice',
//     method: 'post',
//     data
//   })
// }

// // 发票邮寄--邮寄查询
// export function invoicerrManager_invoicerMail(data) {
//   return request({
//     url: '/order-center/order/a/invoice-manager/siw/search/ship',
//     method: 'post',
//     data
//   })
// }

// // 发票详情信息
// export function invoicerrManager_mailingDetail(data) {
//   return request({
//     url: '/order-center/order/a/invoice-manager/detail/'+ data,
//     method: 'get'
//     // ,params: data
//   })
// }

// // 发票邮寄--邮寄发票 invoicerrManager_saveInvoice
// export function invoicerrManager_foundMail(data) {
//   return request({
//     url: '/order-center/order/a/invoice-manager/siw/shipSave',
//     method: 'post',
//     data
//   })
// }