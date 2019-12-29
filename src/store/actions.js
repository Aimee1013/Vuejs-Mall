import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'


export default {
	addCart(context, payload) {
		return new Promise((resolve, reject) => {
			// payload新添加的商品
			// 方法一：1.查找之前数组中是否有该商品
			// let oldProduct = null;
			// for(let item of state.cartList){
			// 	if(item.iid === payload.iid){
			// 		// 遍历购物车中所有的商品，判断如果该商品id等于已有的商品id，说明该商品已存在在购物车中，就把该商品赋值给oldProduct
			// 		oldProduct = item;
			// 	}
			// }

			// 方法二：1.查找之前数组中是否有该商品(在购物车中找，如果该商品id等于已有的商品id，说明该商品已存在在购物车中)
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

			// 2.判断oldProduct
			if(oldProduct){//如果是之前已存在的商品，数量就加1
				// oldProduct.count += 1
				context.commit(ADD_COUNTER, oldProduct)
				resolve('添当前的商品数量：1')
			}else{//否则就是新商品，数量变为1，并且将该商品添加到购物车中
				payload.count = 1
				//context.state.cartList.push(payload)
				context.commit(ADD_TO_CART, payload)
				resolve('添加了新商品')
			}
		}) 
	}
}