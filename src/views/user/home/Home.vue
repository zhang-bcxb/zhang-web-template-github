<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>英语单词学习网站</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 左侧 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <!-- 折叠按钮 -->
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>

        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" :router="true"
                 :default-active="activePath">
          <div v-for="item in menulist" :key="item.path">
            <el-menu-item v-if="!item.meta.hidden" @click="saveNavState(item.path)" :index="item.path" >
              <i :class="item.meta.iconClass"></i>
              <span style="margin: 10px" :class="{active: isCollapse}" slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <!-- 右侧 主体区域 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userRouter } from '@/router/router-all'

export default {
  // 私有数据
  data() {
    return {
      // 左侧菜单数据 一级菜单
      menulist: [],
      // 是否折叠，默认不折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  // Vue周期函数
  created() {
    this.menulist = userRouter[0].children
    this.activePath = window.localStorage.getItem('activePath')
  },
  methods: {
    // 退出功能函数
    logout() {
      // 清空 token
      window.localStorage.clear()
      // 跳转到登录页
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 鼠标点击二级菜单触发，保存链接的激活状态
    saveNavState(activePath) {
      // 将状态保存到window下  参数：键 值
      window.localStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang = "scss" scoped>
.home-container {
  height: 100%;
  width: 100%;
}

.el-header {
  background-color: #373d41;
  /* flex 布局 */
  display: flex;
  /* 左右贴边对齐 */
  justify-content: space-between;
  padding-left: 0;
  /* y轴居中对齐 */
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    /* y轴居中对齐 */
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  /* 行高：垂直居中对齐 */
  line-height: 24px;
  color: #fff;
  /* 水平居中对齐 */
  text-align: center;
  /* 文字之间的间距 */
  letter-spacing: 0.2em;
  /* 鼠标样式：变成小手 */
  cursor: pointer;
}

.active {
  display: none;
}
</style>
