<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
			
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			<detail-param-info ref="params" :param-info="paramInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<goods-list ref="recommend" :goods="recommends"/>

		</scroll>
		<detail-bottom-bar @addCart="addToCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>	
    <toast :message="message" :show="show"/>
    
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
	import DetailBottomBar from './childComps/DetailBottomBar'



	import Scroll from 'components/common/scroll/Scroll'
	import GoodsList from 'components/content/goods/GoodsList'
  import Toast from 'components/common/toast/Toast'




	import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"
	import {debounce} from "common/utils"
	import {itemListenerMixin, backTopMixin} from "common/mixin"



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
  	DetailBottomBar,
  	Scroll,
  	GoodsList,
    Toast
  },
  mixins: [itemListenerMixin, backTopMixin],
  data () {
    return {
    	iid: null,
    	topImages: [],
    	goods: {},
    	shop: {},
    	detailInfo: {},
    	paramInfo: {},
    	commentInfo: {},
    	recommends: [],
    	themeTopYs: [],
    	getThemeTopY: null,
      message: '',
      show: false
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

  		// 6.获取参数信
  		this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

  		// 7.取出评论的信息(需要先判断，如果有评论信息就取，没有就不取,cRate !== 0 评价的数量不等于0说明就有评论信息)
  		if(data.rate.cRate !== 0){
  			this.commentInfo = data.rate.list[0]
  		}

  		// 上面所有的数据都渲染完，再来回调一次该函数，就能取到完整数据了,但是值并不准确，因为获取到的offsetTop值没包含到所有的图片
  		// this.$nextTick(() => {
  			// 动态获取对应板块的offsetTop
	// this.themeTopYs.push(0);
	// this.themeTopYs.push(参数的offsetTop);
	// this.themeTopYs.push(评论的offsetTop);
	// this.themeTopYs.push(推荐的offsetTop);

	// this.themeTopYs = []
	
	// this.themeTopYs.push(0);
	// this.themeTopYs.push(this.$refs.params.$el.offsetTop);
	// this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
	// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
	// console.log(this.themeTopYs);
 //  		})

  	})

  	// 3.根据iid请求推荐数据
  	getRecommend(this.iid).then(res => {
  		console.log(res)
  		this.recommends = res.data.list
  	})

  	// 4.给getThemeTopY赋值(给this.getThemeTopY赋值的操作进行防抖，确保只刷新一次)
  	this.getThemeTopY = debounce(() => {
  		console.log('******')
  		// 动态获取对应板块的offsetTop
			// this.themeTopYs.push(0);
			// this.themeTopYs.push(参数的offsetTop);
			// this.themeTopYs.push(评论的offsetTop);
			// this.themeTopYs.push(推荐的offsetTop);

			this.themeTopYs = []
			
			this.themeTopYs.push(0);
			this.themeTopYs.push(this.$refs.params.$el.offsetTop-44);
			this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
			this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
			this.themeTopYs.push(Number.MAX_VALUE) //添加一个无穷大的值

			console.log(this.themeTopYs);
  	}, 200)
  },
  mounted() {
// console.log("mixin just now detail")

  },
  destroyed(){
  	this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  methods: {
  	imageLoad() {
  		this.newRefresh();

  		this.getThemeTopY();
  	},
  	titleClick(index){
  		// 点击tabbar，页面中的内容滚动到相应的位置(需要动态获取对应板块的offsetTop)
  		console.log(index);
  		this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
  	},
  	//抽取到混入中了，这里就不需要写了
    // backClick() {
    //   // 500 表示在500毫秒之内返回顶部
    //   this.$refs.scroll.scrollTo(0, 0, 500)
    // },
  	contentScroll(position) {

  		// console.log(position)
  		// 1.获取页面内容滚动时的Y值
  		const positionY = -position.y

  		// 2.再使用positionY与主题内容中获取的值 [0, 11717, 12448, 12644, Number.MAX_VALUE]做对比
  		/*
  		positionY在0-11717之间， index = 0
  		positionY在11717-12448之间， index = 1
  		positionY在12448-12644之间， index = 2
  		positionY超过12644， index = 3
  		*/

  		let length = this.themeTopYs.length
  		for(let i=0; i< length; i++) {

  			// 第一种判断方法：
  			// if(this.currentIndex !== i && ((i< length-1 && positionY >= this.themeTopYs[i] && positionY<this.themeTopYs[i+1]) || (i ===length-1 && positionY >=this.themeTopYs[i]))){
  			// 	this.currentIndex = i;
  			// 	console.log(this.currentIndex)
  			// 	this.$refs.nav.currentIndex = this.currentIndex;
  			//} 

  			// 第二种判断方法：（需要添加一个无穷大的值）
			if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
				this.currentIndex = i;
			console.log(this.currentIndex)
			this.$refs.nav.currentIndex = this.currentIndex;
			}
  		}

  		// 3.是否显示回到顶部
  		// this.listenShowBackTop(position)

  		// 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000;

      this.listenShowBackTop(position)
  	},
  	addToCart(){//在方法中监听addToCart
  		console.log('在方法中监听addToCart')
  		// 1.获取购物车中需要展示的信息，然后将这些信息添加到购物车中（图片、标题、价格、数量）
  		// 1.1定义常量存储信息
  		const product = {}
  		// 1.2从之前存储的图片数据中取一张图片出来
  		product.image = this.topImages[0];
  		product.title = this.goods.title;
  		product.desc= this.goods.desc;
  		product.price = this.goods.realPrice;
  		product.iid = this.iid;

  		// 2.将商品添加到购物车中
  		// this.$store.commit('addCart', product) //将判断逻辑写在mutations的中的调用方式
  		 //将判断逻辑写在action的中的调用方式
       this.$store.dispatch('addCart', product).then(res => {
          console.log(res)
          this.show = true;
          this.message = res;


          setTimeout(() => {
            this.show = false;
            this.message = '';
          }, 1500)
       })
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