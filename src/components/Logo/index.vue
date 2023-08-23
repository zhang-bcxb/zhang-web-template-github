<template>
  <router-link :to="to" class="logo-main">
    <img
      v-if="globalSettings.logoType === 'logo'"
      src="@/assets/images/logo/logo.png"
      class="logo"
    >
    <i
      v-else-if="globalSettings.logoType === 'iconfont'"
      :class="globalSettings.logoIconName"
      class="icon"
    />
    <span v-if="showTitle" class="title">{{ globalSettings.siteName }}</span>
  </router-link>
</template>

<script>
import { globalSettings } from '@/setting';

export default {
  name: 'Logo',
  props: {
    showLogo: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: '数字医信',
    };
  },
  computed: {
    to() {
      const rtn = {};
      rtn.name = 'login';
      return rtn;
    },
    globalSettings() {
      return globalSettings;
    },
  },
};
</script>

<style lang="less" scoped>
.logo-main {
  display: flex;
  &.is-link {
    cursor: pointer;
  }
  .logo {
    width: 115px;
    height: 50px;
  }
  .icon {
    font-size: 40px;
    color: #fff;
  }
  .title {
    text-decoration: none;
    font-size: 24px;
    margin-left: 22px;
    align-self: center;
    font-weight: bold;
    color: #fff;
    white-space: nowrap;
  }
}
</style>
