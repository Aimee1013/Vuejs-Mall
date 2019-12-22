<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<recommend-view :recommends="recommends"/>
		<feature-view/>
	</div>
</template>

<script>
	//default导出，导入时就不需要大括号{}，否则需要带上{}
	import NavBar from 'components/common/navbar/NavBar';
	import HomeSwiper from './childComps/HomeSwiper';
	import RecommendView from './childComps/RecommendView';
	import FeatureView from './childComps/FeatureView'

	import {getHomeMultidata} from "network/home";
	

export default {

  name: 'Home',
  components: {
  	NavBar,
  	HomeSwiper,
  	RecommendView,
  	FeatureView
  },
  data() {
  	return {
  		banners: [],
  		recommends: []
  	}
  },
  created() {
  	// 1.请求首页多个数据
  	getHomeMultidata().then(res => {
  		this.banners = res.data.banner.list;
  		this.recommends = res.data.recommend.list;
  	})
  }
}
</script>

<style lang="css" scoped>
#home {
	padding-top: 44px;
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
</style>