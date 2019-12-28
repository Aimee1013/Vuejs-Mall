<template>
	<div class="cart">
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar'

	import {mapGetters} from 'vuex'

export default {

  name: 'Cart',
  components: {
  	NavBar
  },
  computed: {
  	...mapGetters(['cartLength'])
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
.nav-bar {
	background-color: var(--color-tint);
	color: #fff;
}
</style>