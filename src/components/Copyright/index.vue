<template>
  <footer class="copyright">
    Copyright © {{ copyrightOptions.date }}
    <span v-if="!copyrightOptions.webSite">
      {{ copyrightOptions.company }}
    </span>
    <a v-else :href="copyrightOptions.webSite">
      {{ copyrightOptions.company }}
    </a>
  </footer>
</template>

<script>
import { globalSettings } from '@/setting';

export default {
  name: 'Copyright',
  data: () => ({
    copyrightOptions: globalSettings.copyrightOptions,
  }),
};
</script>

<style lang="less" scoped>
footer {
  margin: 40px 0 20px 0;
  line-height: 20px;
  text-align: center;
  color: #808695;
  font-size: 14px;
  a {
    text-decoration: none;
    color: #808695;
    &:hover {
      color: #3d4047;
    }
  }
}
</style>
