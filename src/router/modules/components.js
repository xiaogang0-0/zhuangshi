/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

// 默认无权限也可查看的路由
const componentsRouter = [
  // +++++++++++++++++++++++  客户端  ++++++++++++++++++++++++//
  // 编辑注册资料
  {
    path: '/registrationInforMange',
    component: Layout,
    redirect: '/registrationInforMange/index', // 重定向
    name: 'registrationInforMange',
    meta: { title: '', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/registrationInforMange/index',
        component: () => import('@/views/registrationInforMange/index'),
        // name: 'page',
        name: 'registrationInforMange',
        meta: { title: '编辑注册资料' },
        hidden: false,
        // children: []
      },
      
    ]
  },

  // ++++++++++++++++++++++++   后台登录  +++++++++++++++++++++++++++++//
  // 首页 - 公司管理
  {
    path: '/companyManagement',
    component: Layout,
    redirect: '/companyManagement/index', // 重定向
    name: 'companyManagement',
    meta: { title: '公司管理', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/companyManagement/index',
        component: () => import('@/views/companyManagement/index'),
        // name: 'page',
        name: 'companyManagement',
        meta: { title: '公司管理' },
        hidden: false,
        // children: []
      },
      {
        path: '/companyManagement/auditDetails',
        component: () => import('@/views/companyManagement/auditDetails'),
        // name: 'page',
        name: 'companyManagement_auditDetails',
        meta: { title: '公司详情' },
        hidden: true,
        // children: []
      },
      
    ]
  },
  // 注册资料审核 dataAuditManagement
  {
    path: '/dataAuditManagement',
    component: Layout,
    redirect: '/dataAuditManagement/index', // 重定向
    name: 'dataAuditManagement',
    meta: { title: '注册资料审核', icon: 'chart' },
    hidden: false,
    children: [
      {
        path: '/dataAuditManagement/index',
        component: () => import('@/views/dataAuditManagement/index'),
        // name: 'page',
        name: 'dataAuditManagement',
        // meta: { title: '编辑注册资料审核' },
        meta: { title: '注册资料审核' },
        hidden: false,
        // children: []
      },
      {
        path: '/dataAuditManagement/auditDetails',
        component: () => import('@/views/companyManagement/auditDetails'),
        // name: 'page',
        name: 'dataAuditManagement_auditDetails',
        meta: { title: '编辑注册资料详情' },
        hidden: true,
        // children: []
      },
     
    ]
  },
  
  

  

]

export default componentsRouter
