// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: h => h('router-view')
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    meta: { title: '测试' },
    redirect: { name: 'dashboard' },
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        component: RouteView,
        redirect: {name: 'Workplace'},
        meta: { title: '首页', keepAlive: true, icon: '', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/index',
            name: 'Workplace',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '列表', keepAlive: true, permission: ['dashboard'] }
          },
        ]
      },

    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
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
  }
]
