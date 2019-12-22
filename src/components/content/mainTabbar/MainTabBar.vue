<template>
	 <!-- 3.最后才能再模板中使用 -->
	
		<tab-bar>
	      <tab-bar-item path='/home' activeColor="#ff5777">
	        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
	        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
	        <div slot="item-text">首页</div>
	      </tab-bar-item>
	      <tab-bar-item path='/category' activeColor="#ff5777">
	        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
	        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
	        <div slot="item-text">分类</div> 
	      </tab-bar-item>
	      <tab-bar-item path='/cart' activeColor="#ff5777">
	        <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
	        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
	        <div slot="item-text">购物车</div>
	      </tab-bar-item>
	      <tab-bar-item path='/profile' activeColor="#ff5777">
	        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
	        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
	        <div slot="item-text">我的</div>
	      </tab-bar-item>
	    </tab-bar>
	
</template>

<script>
	/*1.把TabBar单独封装后，还需要导入*/
  import TabBar from 'components/common/tabbar/TabBar.vue'
  import TabBarItem from 'components/common/tabbar/TabBarItem.vue'

export default {
  name: 'MainTabBar',
  components: {/*2.还需要注册一下这个组件*/
    TabBar,
    TabBarItem
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>