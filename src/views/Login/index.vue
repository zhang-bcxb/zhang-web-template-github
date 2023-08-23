<template>
  <div>
    <!-- 背景图 -->
    <Swiper :options="bgSwiperOption" class="bg-banner">
      <swiper-slide class="item item1" />
      <swiper-slide class="item item2" />
      <swiper-slide class="item item3" />
    </Swiper>
    <!-- 内容 -->
    <div id="login-box">
      <!-- 左侧滚动条 -->
      <div class="flex-container">
        <Swiper :options="swiperOption" class="banner">
          <swiper-slide v-for="(item, index) in banner" :key="index">
            <img class="item" :src="item" >
          </swiper-slide>
        </Swiper>
      </div>
      <!-- 登录表单 -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="flex-container login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ settings.siteName }}</h3>
        </div>
        <div>
          <el-form-item prop="account">
            <el-input
              ref="name"
              v-model="form.account"
              prefix-icon="el-icon-user-solid"
              placeholder="用户名"
              type="text"
              tabindex="1"
              auto-complete="on"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="form.password"
              :type="passwordType"
              prefix-icon="el-icon-lock"
              placeholder="密码"
              tabindex="2"
              auto-complete="on"
              @keyup.enter.native="handleLogin"
            >
              <i
                slot="suffix"
                class="el-input__icon"
                :class="
                  passwordType === 'password' ? 'el-icon-ali-eye-close' : 'el-icon-ali-eye-open'
                "
                @click="showPassword"
              />
            </el-input>
          </el-form-item>
        </div>
        <el-checkbox v-model="form.remember">记住我</el-checkbox>
        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%;"
          @click.native.prevent="handleLogin"
        >
          登录
        </el-button>
      </el-form>
    </div>
    <Copyright />
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { globalSettings } from '@/setting';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    settings() {
      return globalSettings;
    },
  },
  data() {
    return {
      bgSwiperOption: {
        observer: true, // 修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, // 修改swiper的父元素时，自动初始化swiper
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      swiperOption: {
        init: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        loop: true,
      },
      banner: [
        'https://i.loli.net/2020/04/21/B2ThI5N6UZlxMwr.png',
        'https://i.loli.net/2020/04/21/A1cvYsQeXfTDoJx.png',
        'https://i.loli.net/2020/04/21/5URp2Ge6YVEcfS1.png',
      ],
      form: {
        account: this.$store.state.userStore.account,
        password: '',
        remember: !!this.$store.state.userStore.account,
      },
      rules: {
        account: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          {
            min: 6,
            max: 18,
            trigger: 'blur',
            message: '密码长度为6到18位',
          },
        ],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
    };
  },
  mounted() {},
  methods: {
    showPassword() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password';
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          // 登录
          this.$api
            .login({
              account: this.form.account,
              password: this.form.password,
            })
            .then((res) => {
              // 判断
              if (this.form.remember) {
                // 存账号
                this.$store.commit('userStore/setAccount', this.form.account);
              } else {
                // 清空账号
                this.$store.commit('userStore/setAccount', '');
              }
              this.$store.commit('userStore/setToken', res.szyxtoken);
              // 判断是否有重定向路径,有就重定向
              console.log(this.$route);
              const { redirect } = this.$route.query;
              if (redirect) {
                this.$router.push(redirect);
              } else {
                this.$router.push('/');
              }
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bg-banner {
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  .item {
    background-size: cover;
    &1 {
      background-image: url(../../assets/images/login/1.png);
    }
    &2 {
      background-image: url(../../assets/images/login/2.jpg);
    }
    &3 {
      background-image: url(../../assets/images/login/3.jpg);
    }
  }
}
#login-box {
  display: flex;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 5px #999;
  .flex-container {
    width: 400px;
  }
  .banner {
    opacity: 0.9;
    .item {
      width: 400px;
      height: 400px;
    }
  }
  .login-form {
    width: 450px;
    padding: 50px 35px 0;
    overflow: hidden;
    .svg-icon {
      vertical-align: -0.35em;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 22px;
        color: #666;
        margin: 0 auto 30px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
  ::v-deep .el-input {
    display: inline-block;
    height: 48px;
    width: 100%;
    input {
      height: 48px;
    }
    .el-input__prefix {
      left: 10px;
    }
    .el-input__suffix {
      right: 10px;
    }
  }
  .el-checkbox {
    margin: 20px 0;
  }
}
.copyright {
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin: 0;
  mix-blend-mode: difference;
}
</style>
