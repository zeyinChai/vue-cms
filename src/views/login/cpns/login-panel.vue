<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span class="text">账号登录</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>

    <el-button
      class="login-btn"
      type="primary"
      plain
      text
      bg
      @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LoginAccount from "./login-account.vue";
import LoginPhone from "./login-phone.vue";
// 定义属性
const isKeepPassword = ref(true);
const accountRef = ref();
const phoneRef = ref();
const currentTab = ref<string>("account");
const phoneTab = ref<string>("account");

// 定义方法
const handleLoginClick = () => {
  // 触发组件的方法
  if (currentTab.value === "account") {
    accountRef.value.loginAction(isKeepPassword.value);
  } else {
    console.log("phoneRef调用loginAction");
  }
};
</script>

<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;

  .title {
    text-align: center;
  }
  .el-icon {
    vertical-align: middle;
    margin-right: 2px;
  }
  .text {
    vertical-align: middle;
  }
  .account-control {
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 5px;
  }
}
</style>
