export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: '仓库首页',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        path: '/user1',
        icon: 'user',
        name: '用户信息管理',
        routes: [
          {
            path: 'user1',
            name: '用户管理',
            component: './User1/User1',
          },
          {
            path: 'role',
            name: '角色管理',
            component: './Role/Role',
          }
        ],
      },
      {
        path: '/products',
        icon: 'appstore',
        name: '产品信息管理',
        routes: [
          {
            path: 'product',
            name: '产品管理',
            component: './Product/Product',
          },
          {
            path: 'type',
            name: '种类管理',
            component: './Type/Type',
          }
        ],
      },
      {
        path: '/order',
        icon: 'profile',
        name: '订单信息管理',
        routes: [
          {
            path: 'buy',
            name: '采购订单信息管理',
            component: './Buy/Buy',
          },
          {
            path: 'sale',
            name: '销售订单信息管理',
            component: './Sale/Sale',
          }
        ],
      },
      {
        path: '/warehouse',
        icon: 'apartment',
        name: '出入库信息管理',
        routes: [
          {
            path: 'into',
            name: '采购订单信息管理',
            component: './Into/Into',
          },
          {
            path: 'out',
            name: '销售订单信息管理',
            component: './Out/Out',
          }
        ],
      },
      {
        path: '/supplier',
        icon: 'solution',
        name: '供应商顾客信息管理',
        routes: [
          {
            path: 'into',
            name: '顾客信息管理',
            component: './Customer/Customer',
          },
          {
            path: 'merchants',
            name: '供应商信息管理',
            component: './Merchants/Merchants',
          }
        ],
      },
      {
        path: '/inventory',
        icon: 'gold',
        name: '产品库存信息管理',
        component: './Inventory/Inventory',
        // routes: [
        //   {
        //     path: 'into',
        //     name: '顾客信息管理',
        //     component: './Customer/Customer',
        //   },
        //   {
        //     path: 'merchants',
        //     name: '供应商信息管理',
        //     component: './Merchants/Merchants',
        //   }
        // ],
      },
      // {
      //   path: '/basic',
      //   icon: 'form',
      //   name: '基础信息管理',
      //   routes: [
      //     // {
      //     //   path: 'grade',
      //     //   name: '年级管理',
      //     //   component: './Grade/Grade',
      //     // },
      //     {
      //       path: 'class',
      //       name: '班级管理',
      //       component: './Class/Class',
      //     },
      //     // {
      //     //   path: 'course',
      //     //   name: '课程管理',
      //     //   component: './Course/Course',
      //     // },
      //   ],
      // },
      {
        component: '404',
      },
    ],
  },
];
