import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// new一个vue实例来发射事件，实现事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
