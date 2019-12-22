module.exports = {
	// 配置别名
	configureWebpack: {
		resolve: {
			alias: {
				//'@' : 'src', 源文件自动配置好了
				'assets' : '@/assets',
				'common' : '@/common',
				'components' : '@/components',
				'network' : '@/network',
				'views' : '@/views', 
				//'router' : '@/router',
			}
		}
	}
}