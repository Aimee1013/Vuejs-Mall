// 混入的使用
import {debounce} from "./utils"

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null
		}
	},
	mounted(){
	let newRefresh = debounce(this.$refs.scroll.refresh, 200)
  	this.itemImgListener = () => {
  		newRefresh()
  	}
  	this.$bus.$on('itemImgLoad', this.itemImgListener)
  	console.log("mixin just now")
	}
}