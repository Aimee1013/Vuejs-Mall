<template>
	<div class="tab-control">
		<div v-for="(item, index) in titles" 
			 class="tab-control-item" 
			 :class="{active: index === currentIndex}"
			 @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
export default {

  name: 'TabControl',
  props: {
  	titles: {
  		type: Array,
  		default(){
  			return []
  		}
  	}
  },
  data(){
  	return {
  		currentIndex: 0, /*定义一个变量，记录当前哪个元素被选中*/
  	}
  },
  methods: {
  	itemClick(index) {
  		this.currentIndex = index;
      this.$emit('tabClick', index) /*$emit把数据传出去*/
  	}
  }
}
</script>

<style lbang="css" scoped>
.tab-control{
	display: flex;
	text-align: center;
	font-size: 15px;
	height: 40px;
	line-height: 40px;
	background-color: #fff;
}
.tab-control-item {
	flex: 1;
}
.tab-control-item span {
	padding: 3px;
}

.active {
	color: var(--color-high-text);
}
.active span {
	border-bottom: 3px solid var(--color-tint);
}
</style>