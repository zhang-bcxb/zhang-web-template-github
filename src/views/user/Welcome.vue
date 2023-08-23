<template>
  <div>
    <div class="container">
      <div class="item yellow">
        <p>欢迎来到学习网站首页</p>
      </div>
      <div class="item blue">
        <p>欢迎来到学习网站首页</p>
      </div>
      <div class="item green">
        <p>欢迎来到学习网站首页</p>
      </div>
      <div class="item pink">
        <p>欢迎来到学习网站首页</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
};

</script>

<style lang="scss" scoped>
.container {
  /* 子绝父相 */
  position: relative;
  /* 占满整个视口 */
  height: 86vh;
}

.item {
  /* 绝对定位 */
  position: absolute;
  left: 0;
  height: 0;
  width: 100%;
  height: 100%;
  /* 弹性盒子 */
  display: flex;
  /* 水平居中 */
  justify-content: center;
  /* 垂直居中 */
  align-items: center;
  /* 设置字体大小 */
  font-size: 66px;
  /* 字体倾斜 */
  font-style: italic;
  /* 字体颜色 */
  color: white;
  /* 背景向左移动一个页面的距离 */
  transform: translateX(-100%);
}

.item p {
  /* 文字向左移动两个页面的距离 */
  transform: translateX(-190%);
  /* 文字间距 */
  letter-spacing: 0.2em;
}

.yellow {
  background-color: rgb(156, 156, 71);
  /* 开始动画 */
  animation: bg 0.3s linear forwards;
}

.yellow p {
  /* 开始动画 forwards定格在最后一帧 */
  animation: text 3s 0.3s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.blue {
  background-color: rgb(71, 80, 156);
  /*  rect(top,right,botton,left) */
  clip: rect(0, 1100px, 100vh, 0);
  /* 开始动画 */
  animation: bg 2.4s 0.6s linear forwards;
}

.blue p {
  /* 开始动画 forwards定格在最后一帧 */
  animation: text 2.4s 0.6s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.green {
  background-color: rgb(31, 158, 73);
  /*  rect(top,right,botton,left) */
  clip: rect(0, 920px, 100vh, 0);
  /* 开始动画 */
  animation: bg 2.1s 0.9s linear forwards;
}

.green p {
  /* 开始动画 forwards定格在最后一帧 */
  animation: text 2.1s 0.9s cubic-bezier(0, 0.49, 0, 1) forwards;
}

.pink {
  background-color: rgb(126, 28, 85);
  /*  rect(top,right,botton,left) */
  clip: rect(0, 600px, 100vh, 0);
  /* 开始动画 */
  animation: bg 1.8s 1.2s linear forwards;
}

.pink p {
  /* 开始动画 forwards定格在最后一帧 */
  animation: text 1.8s 1.2s cubic-bezier(0, 0.49, 0, 1) forwards;
}

/* 设置背景动画 */

@keyframes bg {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* 设置文字动画 */

@keyframes text {
  from {
    transform: translateX(-190%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
