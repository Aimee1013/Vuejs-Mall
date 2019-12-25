<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot> 
    </div> 
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {

  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false /*默认不需要监听，需要监听的地方，手动改设置成true*/
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) {//只有在滑动时才需要监听，这样会比较严谨
        this.scroll.on('scroll', (position) => {
        // 把监听到的滚动位置，传出去，谁需要使用就@scroll来引用
        this.$emit('scroll', position)
      })
    }

    // 3.监听scroll滚动到底部，此时需要执行上拉加载更多事件
    if(this.pullUpLoad){ //只有需要上拉加载更多时才执行该操作，更为严谨
        this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp') //emit发射出去，从子组件发射到父组件，然后在父组件home.vue中调上拉加载更多
      })
    }
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      // 先判断this.scroll中是否有值，有值的话才调用finishPullUp
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>

<style lang="css" scoped>
</style>