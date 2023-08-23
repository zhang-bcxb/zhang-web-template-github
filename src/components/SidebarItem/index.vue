<template>
  <div v-if="!item.meta || !item.meta.sidebarHiiden" class="sidebarItem">
    <!-- 没有子项 -->
    <router-link v-if="!hasChildren" :to="resolvePath(item.path)">
      <el-menu-item :title="item.meta && item.meta.title" :index="resolvePath(item.path)">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" class="icon" />
        <span slot="title">{{ item.meta && item.meta.title }}</span>
      </el-menu-item>
    </router-link>
    <!-- 有子项 -->
    <el-submenu
      v-else
      :title="item.meta && item.meta.title"
      :index="resolvePath(item.path)"
      popper-class="el-menu-pop-class"
    >
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon" class="icon" />
        <span slot="title">{{ item.meta && item.meta.title }}</span>
      </template>
      <SidebarItem
        v-for="route in item.children"
        :key="route.path"
        :item="route"
        :base-path="resolvePath(item.path)"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    hasChildren() {
      if (this.item.children) {
        return true;
      }
      return false;
    },
  },
  created() {},
  mounted() {},
  methods: {
    isExternal(routePath) {
      return /^(https?:|mailto:|tel:)/.test(routePath);
    },
    resolvePath(routePath) {
      if (this.isExternal(routePath)) {
        return routePath;
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
<style lang="less" scoped>
// 默认背景色
.sidebarItem {
  .icon {
    color: @g-sidebar-icon-color;
    font-size: 20px;
  }
}
</style>
<style lang="less">
// 弹出层子菜单
.el-menu-pop-class .el-menu-item {
  background-color: @g-sidebar-item-background-color !important;
   &:hover {
      background-color: @g-sidebar-hover-background-color !important;
    }
}
// 弹出层子菜单
.el-menu-pop-class .el-submenu .el-submenu__title {
  background-color: @g-sidebar-item-background-color !important;
    &:hover {
      background-color: @g-sidebar-hover-background-color !important;
    }
}
// 非弹出子菜单
.el-submenu {
  .el-submenu > .el-submenu__title {
    background-color: @g-sidebar-item-background-color !important;
    &:hover {
      background-color: @g-sidebar-hover-background-color !important;
    }
  }
  .el-menu-item {
    background-color: @g-sidebar-item-background-color !important;
    &:hover {
      background-color: @g-sidebar-hover-background-color !important;
    }
  }
}
// 鼠标移上去颜色
.el-submenu__title:hover {
  background-color: @g-sidebar-hover-background-color !important;
  .icon {
    color: @g-sidebar-hover-icon-color;
  }
  span {
    color: @g-sidebar-hover-text-color;
  }
}
// 鼠标移上去颜色
.el-menu-item:hover {
  background-color: @g-sidebar-hover-background-color !important;
  .icon {
    color: @g-sidebar-hover-icon-color;
  }
  span {
    color: @g-sidebar-hover-text-color;
  }
}
// 激活项选中背景色
.el-menu-item.is-active,
.el-submenu .el-menu--inline .el-menu-item.is-active {
  background-color: @g-sidebar-active-background-color !important;
  .icon {
    color: @g-sidebar-active-icon-color;
  }
}
</style>
