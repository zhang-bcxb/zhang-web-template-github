<template>
  <div
    class="layout-main"
    :style="{
      '--real-sidebar-width': realSidebarWidth,
    }"
  >
    <header class="header-container">
      <Logo />
      <div class="row alicenter">
        <UserMenu />
        <LoginOut />
      </div>
    </header>
    <div class="wrapper">
      <!-- 侧边栏 -->
      <div class="sidebar-container">
        <el-menu
          :background-color="variables.g_sidebar_background_color"
          :text-color="variables.g_sidebar_text_color"
          :active-text-color="variables.g_sidebar_active_text_color"
          :default-active="$store.state.routerStore.active"
          unique-opened
          :collapse="$store.state.routerStore.sidebarCollapse"
        >
          <SidebarItem
            v-for="route in $store.state.routerStore.sidebarRoutes"
            :key="route.path"
            :item="route"
            :base-path="route.path"
          />
        </el-menu>
      </div>
      <!-- 主空间 -->
      <div class="main-container">
        <div class="main-header">
          <i
            :class="
              $store.state.routerStore.sidebarCollapse
                ? 'el-icon-ali-showsidebarhoriz'
                : 'el-icon-ali-hidesidebarhoriz'
            "
            class="sidebar-collapse-icon"
            @click="$store.commit('routerStore/setSidebarCollapse')"
          />
          <el-breadcrumb separator-class="el-icon-arrow-right" class="header">
            <!-- <transition-group name="breadcrumb"> -->
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path" :to="item.path">{{
              item.meta.title
            }}</el-breadcrumb-item>
            <!-- </transition-group> -->
          </el-breadcrumb>
        </div>
        <div class="main">
          <transition name="main" mode="out-in">
            <RouterView />
          </transition>
        </div>
        <Copyright />
      </div>
    </div>
  </div>
</template>

<script>
import variables from '@/styles/variables.less';

export default {
  name: 'LayoutMain',
  data: () => ({
    activeIndex: '',
  }),
  computed: {
    variables() {
      return variables;
    },
    breadcrumbList() {
      // 一个数组，包含当前路由的所有嵌套路径片段的路由记录
      const matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
      // 添加默认根路径(它可能不在侧边栏上)
      // if (matched.length !== 0) {
      //   if (matched[0].path !== '/home') {
      //     matched = [{ path: '/home', meta: { title: '控制台' } }].concat(matched);
      //   }
      // }
      return matched;
    },
    realSidebarWidth() {
      if (this.$store.state.routerStore.sidebarCollapse) {
        return variables.g_sidebar_narrow_width;
      }
      return variables.g_sidebar_wide_width;
    },
  },
  methods: {
  },
};
</script>
<style lang="less" scoped>
.layout-main {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  .header-container {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    height: @g-header-height;
    background-color: @g-header-background-color;
  }
  .wrapper {
    display: flex;
    flex: 1;
    min-height: 100%;
    flex-direction: row;
    padding-top: @g-header-height;
    .sidebar-container {
      transition: 0.3s;
      position: fixed;
      z-index: 999;
      height: 100%;
      overflow-y: scroll;
      scroll-behavior: smooth;
      overscroll-behavior: contain; //必须加这个，不然会带动整个屏幕滚动，如果整屏幕也有滚动的话
      width: @g-sidebar-width;
      background-color: @g-sidebar-background-color;
      // firefox隐藏滚动条
      scrollbar-width: none;
      // chrome隐藏滚动条
      &::-webkit-scrollbar {
        display: none;
      }
      // 缩起来的时候,去掉字体
      .el-menu {
        &.el-menu--collapse {
          /deep/ .el-menu-item,
          /deep/ .el-submenu__title {
            span {
              display: none;
            }
            i {
              right: 7px;
            }
          }
        }
      }
    }
    .main-container {
      display: flex;
      margin-left: @g-sidebar-width;
      flex-direction: column;
      flex: 1;
      background-color: @g-main-background-color;
      padding: 10px;
      transition: 0.3s;
      overflow: auto;
      .main-header {
        position: fixed;
        z-index: 99;
        top: @g-header-height;
        left: @g-sidebar-width;
        right: 0;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: @g-breadcrumb-height;
        background-color: #fff;
        transition: 0.3s;
        box-shadow: 0 0 1px 0 #ccc;
        .sidebar-collapse-icon {
          margin-right: 10px;
          color: #606266;
        }
      }
      .main {
        display: flex;
        margin-top: @g-breadcrumb-height;
        flex: 1;
      }
    }
  }
}
</style>
