<template>
  <div class="login">
    <loginPanelVue />
  </div>
</template>

<script lang="ts">
export default {
  name: "loginIndex",
};
</script>

<script lang="ts" setup>
import {} from "vue";
import loginPanelVue from "./cpns/login-panel.vue";
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/login-bg.svg") no-repeat;
  background-size: cover;
}
</style>
