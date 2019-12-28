import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const state = {
	// 放一个变量存储添加进来的所有商品
	cartList: []
}

const store = new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

// 3.从该文件中导出，去挂载到vue实例中(在main.js中做导入)
export default store
