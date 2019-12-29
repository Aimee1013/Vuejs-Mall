import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'

//import toast from 'components/common/toast'

Vue.config.productionTip = false

// new一个vue实例来发射事件，实现事件总线
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
//Vue.use(toast)

// 解决移动端300ms延迟问题
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
