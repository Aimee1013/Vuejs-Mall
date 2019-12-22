<template>
	<div id="tab-bar">
      <slot></slot>
    </div>
</template>

<script>
export default {

  name: 'TabBar',

  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
#tab-bar {
    display: flex;/*设置水平分布*/
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100,100,100,.15);
  }


</style>