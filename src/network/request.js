import axios from 'axios'

// 最终的封装版本：

export function request(config){
	// 1.创建axios的实例
	const instance = axios.create({
		baseURL: 'http://106.54.54.237:8000/api/w1',
		baseURL: 'http://123.207.32.32:8000/api/w1',
		tomeout: 5000
	})

	// 2.axios的拦截器
	// 2.1请求拦截
	instance.interceptors.request.use(config => {
		console.log(config);
		// 执行拦截的作用：
		// 1.比如config中的一些信息不符合服务器的要求
		// 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
		// 3.某些网络请求(比如登录token) 必须携带一些特殊的信息
		return config //如果拦截成功，还需要把拦截的信息返回，否则服务器的发送请求会报错
	}, err => {
		console.log(err);
	})

	// 2.2响应拦截
	instance.interceptors.response.use(res => {
		return res.data //响应成功后只需要返回数据
	}, err => {
		console.log(err);
	})



	// 3.发送真正的网络请求
	return instance(config)
}


