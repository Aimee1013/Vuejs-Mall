<template>
	<div class="bottom-bar">
		<!-- 不能直接监听组件的点击，需要用到native属性，即@click.native -->
		<div class="check-content">
			<check-button 
			:is-checked="isSelectAll" 
			class="check-button"
			@click.native="checkClick"/>
		    <span>全选</span>
		</div>
		<div class="price">
			合计: {{totalPrice}}
		</div>
		<div class="calculate">
			去计算({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton'
export default {

  name: 'CartBottomBar',
  components: {
  	CheckButton
  },
  computed: {
  	totalPrice() {
  		return '￥' + this.$store.state.cartList.filter(item => {
  			return item.checked
  		}).reduce((preValue, item) => {
  			return preValue + item.price * item.count
  		}, 0).toFixed(2) //toFixed(2) 保留两位小数
  	},
 	checkLength() {
  		return this.$store.state.cartList.filter(item => item.checked).length
  	},
  	isSelectAll() {
  		// 方法一：过滤没有选中的项，如果有并且还有长度，说明就存在没选中的项，那么全选选项就取反，即也不选中(该方法需要找到所有不选中的项才结束寻找，再开始执行全选不选中状态，同时还需要考虑购物车没有商品的情况，购物车没有商品就返回false，即不选中
  		// if(this.$store.state.cartList.length === 0) return false
  		// return !(this.$store.state.cartList.filter(item => !item.checked).length)

  		// 方法二：该方法是只要找到一个不选中的项，就停止寻找，开始执行全选不选中状态，同时还需要考虑购物车没有商品的情况，购物车没有商品就返回false，即不选中
  		 //if(this.$store.state.cartList.length === 0) return false 
  		 	//return !this.$store.state.cartList .find(item => !item.checked)

  		 // 方法三：只有所有商品都选中的情况下全选才被选中
  		if(this.$store.state.cartList.length === 0) return false 
  		return this.$store.state.cartList.every(item => item.checked)

  		// 方法四：普通的for循环遍历
  		// 还需要考虑购物车没有商品的情况，购物车没有商品就返回false，即不选中
  		// if(this.$store.state.cartList.length === 0) return false
  		// for(let item of this.$store.state.cartList) {//循环遍历购物车中的所有商品
  		// 	if(!item.checked) {//如果有一个没选中，就返回false，即全选不选中
  		// 		return false
  		// 	}
  		// }
  		// return true //否则说明都没选中了，就返回true

  	}
  },
  methods: {
  	checkClick() {
  		if(this.isSelectAll) {
  		//this.isSelectAll表示全部选中，此时点击一次全选按钮，全选就变为不选中状态，同时所有单项商品都为不选中状态
  		this.$store.state.cartList.forEach(item => item.checked = false)
  		}else {
  			//否则this.isSelectAll全选不选中，为false，说明所有单项商品中有一个或多个不选中，或者全部不选中，
  			//此时点击一次全选按钮，全选就会选中，所有单项商品也都被选中
  			this.$store.state.cartList.forEach(item => item.checked = true)
  		}
  	}
  }
}
</script>

<style lang="css" scoped>
.bottom-bar {
	position: relative;
	display: flex;

	height: 40px;
	line-height: 40px;

	background-color: #eee;
}
.check-content {
	display: flex;
	align-items: center;
	margin-left: 10px;
	width: 80px;
}
.check-button {
	width: 22px;
	height: 22px;
	line-height: 22px;
	margin-right: 5px;
}
.price {
	margin-left: 30px;
	flex: 1;
}
.calculate {
	margin-right: 5px;
	width: 130px;
	background-color: pink;
	color: #fff;
	text-align: center;
}
</style>