<template>
  <div @click="click">首页</div>
</template>
<script>
export default {
  data() {
    return {
      aaa: false,
    };
  },
  methods: {
    click() {
      this.$store.commit('routerStore/setSidebarCollapse');
    },
  },
};
</script>

<style lang="less" scoped></style>
