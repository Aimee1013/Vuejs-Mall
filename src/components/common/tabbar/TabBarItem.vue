<template>
	<div @click="itemClick">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props:{
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isActive: true  这里不能写死
    }
  },
  computed: {
    isActive(){
      /*获取处于活跃路由的path--两种方式*/
      // return this.$route.path.indexOf(this.path) !== -1 
      return this.$route.path == this.path  
      //如果获取的当前路由的path与this.path相等就为true，就显示红色
    },
    activeStyle(){
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      if(this.$route.path!=this.path){
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style lang="css" scoped>
#tab-bar > div {
    flex: 1;/*让各个子元素均等分*/
    text-align: center;
    height: 49px;/*一般tabbar的高度为49*/
  }

  #tab-bar > div img {
  	width: 24px;
  	height: 24px;
  	margin-top: 3px;
  	vertical-align: middle;/*去掉图片与文字之间默认的3px的空隙*/
  	margin-bottom: 2px;
  }
</style>