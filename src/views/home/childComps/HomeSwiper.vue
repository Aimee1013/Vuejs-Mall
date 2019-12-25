<template>
	<swiper>
		<swiper-item v-for="(item, index) in banners" :key="index">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	// import Swiper from 'components/common/swiper/Swiper'
	// import Swiper from 'components/common/swiper/SwiperItem'
	import {Swiper, SwiperItem} from 'components/common/swiper'


export default {

  name: 'HomeSwiper',
  props: {
  	banners: {
  		type: Array,
  		default(){
  			return []
  		}
  	}
  },
  data(){
    return {
      isLoad: false
    }
  },
  components: {
  	Swiper,
  	SwiperItem
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){//设置只执行一次图片加载
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>