// 混入的使用
import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
	data() {
		return {
			itemImgListener: null,
			newRefresh: null
		}
	},
	mounted(){
	this.newRefresh = debounce(this.$refs.scroll.refresh, 200)
  	this.itemImgListener = () => {
  		this.newRefresh()
  	}
  	this.$bus.$on('itemImgLoad', this.itemImgListener)
  	console.log("mixin just now")
	}
}


export const backTopMixin = {
	components: {
		BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick(){
			this.$refs.scroll.scrollTo(0, 0, 500)
		},
		listenShowBackTop(position){
			this.isShowBackTop = -position.y > this.tabOffsetTop
			//this.isShowBackTop = -position.y > 1000
		}
	}
}

