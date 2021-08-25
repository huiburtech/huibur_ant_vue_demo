// with polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'

import './core/lazy_use' // use lazy load components
// import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style

Vue.config.productionTip = false

Vue.use(VueAxios)

new Vue({
  router,
  store,
  // init localstorage, vuex, Logo message
  // created: bootstrap,
  render: h => h(App)
}).$mount('#app')
