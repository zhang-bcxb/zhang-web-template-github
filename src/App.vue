<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data: () => ({
    isRouterAlive: true,
  }),
  watch: {
    // 跳到同一个页面
    $route: 'routeChange',
  },
  methods: {
    // 刷新
    reload(type = 1) {
      if (type === 1) {
        this.isRouterAlive = false;
        this.$nextTick(() => { this.isRouterAlive = true; });
      } else {
        this.$router.push({
          name: 'reload',
        });
      }
    },
    routeChange(newVal, oldVal) {
      if (newVal.name === oldVal.name) {
        this.reload();
      }
    },
  },
};
</script>
<style scoped>
#app {
    height: 100%;
}
</style>
