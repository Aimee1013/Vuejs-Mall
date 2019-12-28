import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types'

export default {
	//任何修改都需要写在mutations中
	// mutations唯一的目的就是修改state中的状态
	// mutations中的每个方法尽可能完成的事件比较单一一点，如判断逻辑和异步操作最好放到actions中
	// addCart(state, payload) {
	// 	// 方法二：1.查找之前数组中是否有该商品(在购物车中找，如果该商品id等于已有的商品id，说明该商品已存在在购物车中)
	// 	let oldProduct = state.cartList.find(item => item.iid === payload.iid)

	// 	// 2.判断oldProduct
	// 	if(oldProduct){//如果是之前已存在的商品，数量就加1
	// 		oldProduct.count += 1
	// 	}else{//否则就是新商品，数量变为1，并且将该商品添加到购物车中
	// 		payload.count = 1
	// 		state.cartList.push(payload)
	// 	}
	// }

	// 方便在vue中跟踪
	[ADD_COUNTER](state, payload) {
		payload.count++
	},
	[ADD_TO_CART](state, payload) {
		state.cartList.push(payload)
	}
}