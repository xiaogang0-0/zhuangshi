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
    hidden: true,
    children: [
      {
        path: '/registrationInforMange',
        component: () => import('@/views/registrationInforMange/index'),
        name: 'registrationInforMange',
        meta: { title: '编辑注册资料' },
        hidden: true,
        // children: []
      },
    ]
  },

  // 人员数据库 personnelDatabaseManagement
  // {
  //   path: '/personnelDatabaseManagement',
  //   component: Layout,
  //   redirect: '/personnelAdd', // 重定向
  //   name: 'personnelDatabaseManagement',
  //   meta: { title: '人员数据库', icon: 'chart' },
  //   hidden: false,
  //   children: [
  //     {
  //       path: 'personnelAdd',
  //       component: () => import('@/views/personnelDatabaseManagement/examineDetails'),
  //       name: 'personnelAdd',
  //       meta: { title: '人员添加' },
  //       hidden: false,
  //       // children: []
  //     },
  //     {
  //       path: 'personnelLis',
  //       component: () => import('@/views/personnelDatabaseManagement/index'),
  //       name: 'personnelLis',
  //       meta: { title: '人员列表',},
  //       hidden: false,
  //       // children: []
  //     },
  //     // activeMenu:'/personnelDatabaseManagement/dataAuditManagement'
  //     // {
  //     //   path: 'personnelLis',
  //     //   component: () => import('@/views/personnelDatabaseManagement/examineDetails'),
  //     //   name: 'personnelLis',
  //     //   meta: { title: '修改资料',},
  //     //   hidden: true,
  //     //   // children: []
  //     // },
     
  //   ]
  // },

  // ++++++++++++++++++++++++   后台登录  +++++++++++++++++++++++++++++//
  // 首页 - 公司管理
  {
    path: '/companyManagementList',
    component: Layout,
    redirect: '/companyManagement', // 重定向
    name: 'companyManagementList',
    meta: { title: '公司管理', icon: 'chart' },
    hidden: true,
    children: [
      {
        path: 'companyManagement',
        component: () => import('@/views/companyManagement/index'),
        name: 'companyManagement',
        meta: { title: '公司管理'},
        hidden: true,
        // children: []
      },
      {
        path: 'companyManagement_auditDetails',
        component: () => import('@/views/companyManagement/auditDetails'),
        name: 'companyManagement_auditDetails',
        meta: { title: '公司详情',activeMenu:'/companyManagementList/companyManagement'},
        hidden: true,
        // children: []
      },
      
    ]
  },
  // 注册资料审核 dataAuditManagement
  {
    path: '/dataAuditManagementList',
    component: Layout,
    redirect: '/dataAuditManagement', // 重定向
    name: 'dataAuditManagementList',
    meta: { title: '注册资料审核', icon: 'chart' },
    hidden: true,
    children: [
      {
        path: 'dataAuditManagement',
        component: () => import('@/views/dataAuditManagement/index'),
        name: 'dataAuditManagement',
        meta: { title: '注册资料审核' },
        hidden: true,
        // children: []
      },
      {
        path: 'dataAuditManagement_auditDetails',
        component: () => import('@/views/dataAuditManagement/examineDetails'),
        name: 'dataAuditManagement_auditDetails',
        meta: { title: '编辑注册资料详情',activeMenu:'/dataAuditManagementList/dataAuditManagement'},
        // meta: { title: '编辑注册资料详情', noCache: true, activeMenu: '/dataAuditManagementList' },
        hidden: true,
        // children: []
      },
     
    ]
  },
  
  

  

]

export default componentsRouter
