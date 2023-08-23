import _ from 'lodash';

export default {
  name: 'Pagination',
  components: {},
  props: {
    // 总条数
    totalNum: {
      type: Number,
      default: 0,
    },
    // 总页数
    totalPage: {
      type: Number,
      default: 0,
    },
    // 当前页数
    curPage: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      num: '',
      options: [
        {
          value: 10,
          label: '10条/页',
        },
        {
          value: 20,
          label: '20条/页',
        },
        {
          value: 50,
          label: '50条/页',
        },
        {
          value: 100,
          label: '100条/页',
        },
        {
          value: 1000,
          label: '1000条/页',
        },
      ],
      curPageSize: this.pageSize,
    };
  },
  computed: {
    disableFirst() {
      if (this.curPage === 1 || this.curPage === 0) {
        return true;
      }
      return false;
    },
    disableNext() {
      if (this.curPage === this.totalPage) {
        return true;
      }
      return false;
    },
    disableGo() {
      if (_.isEmpty(this.num) || _.trim(this.num) === '0') {
        return true;
      }
      return false;
    },
  },
  watch: {
    curPageSize(newVal) {
      // 有变化,通知外面
      this.$emit('pageSizeChanged', newVal);
    },
  },
  created() {},
  mounted() {},
  beforeCreate() {}, // 生命周期 - 创建之前
  beforeMount() {}, // 生命周期 - 挂载之前
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {},
  methods: {
    // 首页
    goHome() {
      this.$emit('goHome');
    },
    // 下一页
    goNext() {
      this.$emit('goNext');
    },
    // 上一页
    goPageUp() {
      this.$emit('goPageUp');
    },
    // 尾页
    goEnd() {
      this.$emit('goEnd');
    },
    // goto
    goTo() {
      // 跳转数字不得大于当前总页数
      if (this.num > this.totalPage) {
        this.$message(`当前一共${this.totalPage}页`);
        return;
      }
      // TODO:校验数字是否合法
      this.$emit('goTo', this.num);
      // 跳转以后清空num
      this.num = '';
    },
  },
};
