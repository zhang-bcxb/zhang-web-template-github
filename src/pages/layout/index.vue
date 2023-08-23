<template>
  <div>
    <sidebarNav class="sidebar" :class="{'sidebar-active':isSidebarNavCollapse}"/>
    <div class="main" :class="{'main-active':isSidebarNavCollapse}">
      <TopAside @isShow="handleShow"/>
      <router-view class="main-container"></router-view>
    </div>
  </div>
</template>

<script>
import sidebarNav from './component/sidebar-nav'
import TopAside from './component/top-aside'

export default {
  data() {
    return {
      isSidebarNavCollapse: false
    }
  },
  methods: {
    handleShow(data) {
      // console.log(data)
      this.isSidebarNavCollapse = data
    }
  },
  components: {
    sidebarNav,
    TopAside
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px !important;
  transition: 0.5s;
}

.main {
  margin-left: 200px;
  transition: 0.5s;
}

.sidebar-active {
  width: 0 !important;
  display: none;
}

.main-active {
  margin-left: 0 !important;
}
</style>
