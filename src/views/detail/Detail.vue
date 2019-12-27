<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"/>
		<scroll class="content" ref="scroll">
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			<detail-param-info :param-info="paramInfo"/>
			<detail-comment-info :comment-info="commentInfo"/>
			<goods-list :goods="recommends"/>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar'
	import DetailSwiper from './childComps/DetailSwiper'
	import DetailBaseInfo from './childComps/DetailBaseInfo'
	import DetailShopInfo from './childComps/DetailShopInfo'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo'
	import DetailParamInfo from './childComps/DetailParamInfo'
	import DetailCommentInfo from './childComps/DetailCommentInfo'


	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'



	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
	import {debounce} from "common/utils"
	import {itemListenerMixin} from "common/mixin"



export default {

  name: 'Detail',
  components: {
  	DetailNavBar,
  	DetailSwiper,
  	DetailBaseInfo,
  	DetailShopInfo,
  	DetailGoodsInfo,
  	DetailParamInfo,
  	DetailCommentInfo,
  	Scroll,
  	GoodsList
  },
  mixins: [itemListenerMixin],
  data () {
    return {
    	iid: null,
    	topImages: [],
    	goods: {},
    	shop: {},
    	detailInfo: {},
    	paramInfo: {},
    	commentInfo: {},
    	recommends: []
    }
  },
  created(){
  	// 1.保存传入的iid
  	this.iid = this.$route.params.iid


  	// 2.根据iid请求详情数据
  	getDetail(this.iid).then(res => {
  		console.log(res)
  		// 1.从res中获取所有的数据定义一个常量data来保存
  		const data = res.result;

  		// 2.获取轮播图的数据
  		this.topImages = data.itemInfo.topImages

  		// 3.获取商品信息
  		this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

  		// 4.创建店铺信息的对象
  		this.shop = new Shop(data.shopInfo)

  		// 5.保存商品的详情数据
  		this.detailInfo = data.detailInfo

  		// 6.获取参数信息
  		this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

  		// 7.取出评论的信息(需要先判断，如果有评论信息就取，没有就不取,cRate !== 0 评价的数量不等于0说明就有评论信息)
  		if(data.rate.cRate !== 0){
  			this.commentInfo = data.rate.list[0]
  		}

  	})

  	// 3.根据iid请求推荐数据
  	getRecommend(this.iid).then(res => {
  		console.log(res)
  		this.recommends = res.data.list
  	})
  },
  mounted() {
console.log("mixin just now detail")
  },
  destroyed(){
  	this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
  	imageLoad() {
  		this.$refs.scroll.refresh()
  	}
  }
}
</script>

<style lang="css" scoped>
#detail {
	position: relative;
	z-index: 9;
	background-color: #fff;
	height: 100vh;
}

.detail-nav {
	position: relative;
	z-index: 9;
	background-color: #fff;
}
 
.content {
	height: calc(100% - 44px)
}
</style>