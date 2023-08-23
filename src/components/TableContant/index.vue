<template>
  <div class="table-contant">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TableContant',
};
</script>

<style lang="less" scoped>
// flex下,table可能动态计算宽度失效
// https://www.jianshu.com/p/79dd2cdf011f
.table-contant {
  flex: 1;
  position: relative;
  /deep/ .el-table {
    position: absolute;
  }
}
</style>
