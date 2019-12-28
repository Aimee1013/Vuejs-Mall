<template>
	<div>
		<back-top @click.native="backClick" v-show="isShowBackTop"/>
	</div>
</template>

<script>

	import {backTopMixin} from "common/mixin"
  // import BScroll from 'better-scroll'

export default {

  name: 'Category',
  mixins: [backTopMixin]
  // mounted(){
  // 	this.scroll = new BScroll(document.querySelector('.wrapper'), {
  // 		probeType: 3,
  // 		pullUpLoad: true,
  // 		click: true
  // 	})

  // 	this.scroll.on('scroll', (position) => {
  // 		console.log(position);
  // 	})

  // 	this.scroll.on('pullingUp', () => {
  // 		console.log('shanglajiazaigengduo');
  // 	})
  // }
}
</script>

<style lang="css" scoped>
.wrapper {
	height: 150px;
	background-color: pink;
}
</style>