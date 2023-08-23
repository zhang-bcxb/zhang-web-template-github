<template>
  <div class="pagination-main">
    <p class="total">共{{ totalNum }}条</p>
    <p class="pageNum">
      <span style="color: red;">{{ curPage }}</span
      >/{{ totalPage }}页
    </p>
    <el-button
      type="primary"
      class="button"
      :disabled="disableFirst"
      @click="goHome()"
    >首页</el-button
    >
    <el-button
      type="primary"
      class="button"
      :disabled="disableFirst"
      @click="goPageUp()"
    >上一页</el-button
    >
    <el-button
      type="primary"
      class="button"
      :disabled="disableNext"
      @click="goNext()"
    >下一页</el-button
    >
    <el-button
      type="primary"
      class="button"
      :disabled="disableNext"
      @click="goEnd()"
    >尾页</el-button
    >
    <el-select class="select" v-model="curPageSize" placeholder="展示条数">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>

    <p class="jump">跳转到</p>
    <el-input v-model="num" placeholder="" class="input"/>
    <el-button
      type="primary"
      class="button"
      :disabled="disableGo"
      @click="goTo()"
    >GO</el-button
    >
  </div>
</template>
<script>
export { default } from './logic';
</script>
<style lang="less" scoped>
.pagination-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
  .total {
    margin-right: 10px;
  }
  .pageNum {
    margin-right: 30px;
  }
  .button {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .input {
    min-width: 50px;
    max-width: 100px;
    margin-right: 10px;
  }
  .jump {
    margin-left: 20px;
    margin-right: 10px;
  }
  .select{
    width: 150px;
    margin-left: 10px;
  }
}
</style>
