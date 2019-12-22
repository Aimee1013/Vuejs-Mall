import Vue from 'vue'
import VueRouter from 'vue-router'


// 对主文件进行懒加载
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建路由对象
const routes = [
	{
		// 利用重定向，默认显示首页 path: '/'或path: ''
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: Home

	},
	{
		path: '/category',
		component: Category

	},
	{
		path: '/cart',
		component: Cart

	},
	{
		path: '/profile',
		component: Profile

	}
]

const router = new VueRouter({
	routes,
	mode: 'history'
})

// 3.导出路由对象，然后再去main.js文件中挂载一下，即导入 import router from './router'
export default router