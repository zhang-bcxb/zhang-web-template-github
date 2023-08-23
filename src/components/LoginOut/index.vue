<template>
  <div class="login-out-main" @click="loginOut">
    <i class="el-icon-ali-guanji" style="fontSize:20px;color:#fff;" />
    <span class="text">退出登录</span>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'LoginOut',
  methods: {
    loginOut() {
      this.$api.loginOut().then(() => {
        this.$store.dispatch('userStore/logonFailure');
        this.$router.push({
          name: 'login',
          // query: {
          //   redirect: this.$route.path,
          // },
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-out-main {
  padding: 10px;
  .text {
    color: #fff;
    font-size: 16px;
    margin-left: 5px;
  }
}
</style>
