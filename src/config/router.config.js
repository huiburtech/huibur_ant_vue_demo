// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '首页', keepAlive: true, icon: 'user', permission: ['dashboard'] },
  },
  {
    path: '/design',
    name: 'design',
    component: RouteView,
    redirect: {name: 'designIndex'},
    meta: { title: '表单设计', keepAlive: true, icon: 'user', permission: ['dashboard'] },
    children: [
      {
        path: '/design/index',
        name: 'designIndex',
        component: () => import('@/views/design/index'),
        meta: { title: '列表', keepAlive: true, icon: 'user', permission: ['dashboard'] }
      }
    ]
  }
]


/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
  },
  {
    path: '',
    redirect: {path: '/'},
    component: BasicLayout,
    meta: { title: '商户管理', keepAlive: true, icon: 'pic-center', permission: ['dashboard'] },
    children: asyncRouterMap
  }
]
