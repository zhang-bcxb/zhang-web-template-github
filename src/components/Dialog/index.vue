<template>
  <el-dialog
    :title="title"
    :visible.sync="visiblenow"
    :before-close="dialogClose"
    :show-close="false"
    :close-on-click-modal="closeOnClickModal && !loadingnow"
    :close-on-press-escape="!loadingnow"
  >
    <div>
      <slot>
        {{ message }}
      </slot>
    </div>
    <div slot="footer">
      <el-button @click="cancel" :disabled="loadingnow">取 消</el-button>
      <el-button type="primary" @click="confirm" :loading="loadingnow">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: '',
    },
    closeOnClickModal: {
      type: Boolean,
      default: true,
    },
    dialogClose: {
      type: Function,
      default: (done) => {
        done();
      },
    },
  },
  computed: {
    visiblenow: {
      get() {
        return this.visible;
      },
      set(val) {
        // 当visible改变的时候，触发父组件的 updateVisible方法，在该方法中更改传入子组件的 centerDialogVisible的值
        this.$emit('update:visible', val);
      },
    },
    loadingnow: {
      get() {
        return this.loading;
      },
      set(val) {
        // 当visible改变的时候，触发父组件的 updateVisible方法，在该方法中更改传入子组件的 centerDialogVisible的值
        this.$emit('update:loading', val);
      },
    },
  },
  methods: {
    cancel() {
      this.visiblenow = false;
      this.$emit('cancel');
    },
    confirm() {
      this.loadingnow = true;
      this.$emit('confirm');
    },
  },
};
</script>

<style lang="less" scoped></style>
