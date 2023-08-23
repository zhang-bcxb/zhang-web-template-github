<template>
  <el-menu
      background-color="#304156"
      text-color="#eee"
      active-text-color="#4dbcff"
      :default-active="currentMenu"
  >
    <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
  </el-menu>
</template>

<script>
import DynamicMenu from './dynamic-menu.vue'
import {mapState} from 'vuex'

export default {
  data() {
    return {
      isCollapse: true
    }
  },
  // 计算属性
  computed: {
    ...mapState('permission', ['sidebarMenu', 'currentMenu'])
  },
  methods: {},
  components: {
    DynamicMenu
  }
}
</script>
