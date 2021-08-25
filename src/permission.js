import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/dashboard/index'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (storage.get(ACCESS_TOKEN)) {
    store.dispatch('addRoute', to.name).then(() => {})
    next()
  } else {
    if (to.path === loginRoutePath) {
      next()
    } else {
      router.replace(loginRoutePath)
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
