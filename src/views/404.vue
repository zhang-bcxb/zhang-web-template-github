<template>
  <div class="notfound">
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <el-button type="primary" @click="goBack">点击返回首页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
  methods: {
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="less" scoped>
.notfound {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      margin: 0;
      font-size: 72px;
      color: #303133;
    }
    .desc {
      margin: 20px 0 30px;
      font-size: 20px;
      color: #606266;
    }
  }
}
</style>
