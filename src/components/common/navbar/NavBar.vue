<template>
	<div class="nav-bar">
	  <div class="left"><slot name="left"></slot></div>	
	  <div class="center"><slot name="center"></slot></div>	
	  <div class="right"><slot name="right"></slot></div>	
	</div>
</template>

<script>
export default {

  name: 'NavBar',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.nav-bar {
	display: flex;
	height: 44px;
	line-height: 44px;
	text-align: center;
	box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

.left, .right {
	width: 60px;
}

.center {
	flex: 1;/*左右已经设定好了宽度，中间就剩一份了，flex=1表示剩余的部分分为1等份，让center来占据*/
}
</style>