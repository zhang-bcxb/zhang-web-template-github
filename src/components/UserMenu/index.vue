<template>
  <div class="user-menu">
    <el-dropdown class="user-container" @command="handleCommand">
      <div class="user-wrapper row alicenter">
        <!-- <el-avatar size="medium" /> -->
        <i class="el-icon-ali-lianxiren" style="font-size:40px;" />
        {{ $store.state.userStore.account }}
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'changePassword': {
          this.$emit('changePassword');
          break;
        }
        default: {
          break;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user-menu {
  display: flex;
  align-items: center;
  .user-container {
    // display: inline-block;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    .user-wrapper {
      color: #fff;
      font-size: 16px;
      .el-avatar {
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 4px;
      }
    }
  }
}
</style>
