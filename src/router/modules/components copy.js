/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 默认无权限也可查看的路由
const componentsRouter = [
  // +++++++++++++++++++++++  客户端  ++++++++++++++++++++++++//
  // 编辑注册资料
  {
    path: '/registrationInforMangeList',
    component: Layout,
    redirect: '/registrationInforMange', // 重定向
    name: 'registrationInforMangeList',
    meta: { title: '', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/registrationInforMange',
        component: () => import('@/views/registrationInforMange/index'),
        // name: 'page',
        name: 'registrationInforMange',
        meta: { title: '编辑注册资料' },
        hidden: false
        // children: []
      }
    ]
  },

  // ++++++++++++++++++++++++   后台登录  +++++++++++++++++++++++++++++//
  // 首页 - 公司管理
  {
    path: '/companyManagementList',
    component: Layout,
    redirect: '/companyManagement', // 重定向
    name: 'companyManagementList',
    meta: { title: '公司管理', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/companyManagement',
        component: () => import('@/views/companyManagement/index'),
        name: 'companyManagement',
        meta: { title: '公司管理' },
        hidden: false
        // children: []
      },
      {
        path: '/companyManagement_auditDetails',
        component: () => import('@/views/companyManagement/auditDetails'),
        name: 'companyManagement_auditDetails',
        meta: { title: '公司详情' },
        hidden: true
        // children: []
      }

    ]
  },
  // 注册资料审核 dataAuditManagement
  {
    path: '/dataAuditManagementList',
    component: Layout,
    redirect: '/dataAuditManagement', // 重定向
    name: 'dataAuditManagementList',
    meta: { title: '注册资料审核', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/dataAuditManagement',
        component: () => import('@/views/dataAuditManagement/index'),
        name: 'dataAuditManagement',
        // meta: { title: '编辑注册资料审核' },
        meta: { title: '注册资料审核' },
        hidden: false
        // children: []
      },
      {
        path: '/dataAuditManagement_auditDetails',
        component: () => import('@/views/dataAuditManagement/examineDetails'),
        // name: 'page',
        name: 'dataAuditManagement_auditDetails',
        meta: { title: '编辑注册资料详情' },
        // meta: { title: '编辑注册资料详情', noCache: true, activeMenu: '/dataAuditManagementList' },
        hidden: true
        // children: []
      }

    ]
  }

]

export default componentsRouter
