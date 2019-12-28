<template>
	<div id="home" class="wrapper">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl1" 
      class="tab-control"
      v-show="isTabFixed"/>

		<scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll" 
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control 
      :titles="['流行', '新款', '精选']" 
      @tabClick="tabClick" 
      ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"/>  
    </scroll> 

  <!-- 监听组件的点击，组件不能直接监听点击，需要加上修饰符native -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/> 
	</div>
</template>

<script>
	//default导出，导入时就不需要大括号{}，否则需要带上{}
	// 导入的子组件部分
	import HomeSwiper from './childComps/HomeSwiper'
	import RecommendView from './childComps/RecommendView'
	import FeatureView from './childComps/FeatureView'

	// 导入的公共组件部分
	import NavBar from 'components/common/navbar/NavBar'
	import TabControl from 'components/content/tabControl/TabControl'
	import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  // import BackTop from 'components/content/backTop/BackTop'

	// 导入的方法类的数据
	import {getHomeMultidata} from "network/home"
	import {getHomeGoods} from "network/home"
  import {debounce} from "common/utils"
  import {itemListenerMixin, backTopMixin} from "common/mixin"
	

export default {

  name: 'Home',
  components: {
  	HomeSwiper,
  	RecommendView,
  	FeatureView,
  	NavBar,
  	TabControl,
  	GoodsList,
    Scroll,
    //BackTop
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
  	return {
  		banners: [],
  		recommends: [],
  		goods: {
  			'pop': {page:0, list: []},
  			'new': {page:0, list: []},
  			'sell': {page:0, list: []},
  		},
  		currentType: 'pop',
      //isShowBackTop: false,
      tabOffsetTop: 0, //首先定义一个变量，这个变量的值需要保存起来
      isTabFixed: false, //定义一个变量，默认不吸顶，等到tabOffsetTop到一定值时才需要吸顶
      saveY: 0,
  	}
  },
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0) //scrollTo(X轴, Y轴, 时间)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    // 1.保存Y值
    this.saveY = this.$refs.scroll.scroll.y

    // 2.取消全局事件的监听
    this.$bus.$on('itemImgLoad', this.itemImgListener)
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
  	// 1.请求首页多个数据
  	this.getHomeMultidata()

  	// 2.请求商品数据
  	this.getHomeGoods('pop')
  	this.getHomeGoods('new')
  	this.getHomeGoods('sell')
  },
  mounted() {//mounted表示挂载之后
    // 通过混入，复用了
    // 1.监听item中图片加载完成
    //const refresh = debounce(this.$refs.scroll.refresh, 200)  //往封装的函数中传值
    // this.$bus.$on('itemImgLoad', () => {
    //   refresh()
    // })

    // 2.获取tabControl的offsetTop(由于tabControl是一个组件，不能使用offsetTop属性来获取值)
    // 但是所有的组件都有一个属性$el: 用于获取组件中的各个元素的，然后再通过组件中的元素来获取offsetTop的值
    //this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    // console.log(this.$refs.tabControl1.$el.offsetTop)
  },
  methods: {
  	// 事件监听相关的方法 
  	tabClick(index){
  		switch (index) {
  			case 0:
  			  this.currentType = 'pop'
  			  break
  			case 1:
  			  this.currentType = 'new'
  			  break
  			case 2:
  			  this.currentType = 'sell'
  			  break
  		}
      // 把两个tabControl的点击事件绑定到一起，保持同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
  	},
    // 抽取到混入中了，这里就不需要写了
    // backClick(){
    //   // 500 表示在500毫秒之内返回顶部
    //   this.$refs.scroll.scrollTo(0, 0, 500)
    // },
    contentScroll(position){
      // 1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000

      // 2.决定tabControl是否吸顶(position: fixed)，当移动的位置大于tabOffsetTop时isTabFixed会为true，只是就需要吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
      this.listenShowBackTop(position)
    },
    loadMore() {
      this.getHomeGoods(this.currentType)

      // 重新计算可滚动的高度
      // this.$refs.scroll.scroll.refresh()
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },


  	// 网络请求相关的方法
  	getHomeMultidata() {
  		getHomeMultidata().then(res => {
  		this.banners = res.data.banner.list;
  		this.recommends = res.data.recommend.list;
  		})
  	},
  	getHomeGoods(type){
  		const page = this.goods[type].page + 1
  		getHomeGoods(type, page).then(res => {
  			this.goods[type].list.push(...res.data.list)
  			this.goods[type].page += 1
        // 上拉加载更多只能执行一次，要调用一下finishPullUp函数--完成上拉加载更多
        this.$refs.scroll.finishPullUp()
  		})
  	}
  }
}
</script>

<style lang="css" scoped>
#home {
	padding-top: 44px;
  height: 100vh; /*设置视口高度*/
}
.home-nav {
	background-color: var(--color-tint);
	color: #fff;
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 9;
}

/*.tab-control {
	position: sticky; //吸顶效果，但是有兼容性问题
	top: 44px;
	z-index: 9;
}*/

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


/*设置content样式的这两种方法都是可行的*/
/*.content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 44px;
}*/

.tab-control{
  position: relative;
  z-index: 9;
}

</style>