/*
 * @Author: Yilin
 * @LastEditors: Yilin
 * @Description: Do not edit
 * @Date: 2023-03-30 21:30:30
 * @LastEditTime: 2023-03-31 16:23:12
 * @FilePath: \helmet-project\config\routes.ts
 */

export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' },
      {
      name: '注册',
    path: '/user/register',
    component: './User/Register',
  },
    ],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/image', name: '图像检测', icon: 'Appstore', component: './ImageTask' },
  { path: '/video', name: '视频检测', icon: 'VideoCamera', component: './VideoTask' },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
    ],
  },
  { name: '历史检测记录', icon: 'BarChart', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
