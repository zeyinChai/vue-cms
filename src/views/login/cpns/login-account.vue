<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineExpose, ref } from "vue";
import { rules } from "../config/account-config";
import LocalCache from "@/utils/cache";
import { useStore } from "vuex";

const store = useStore();
const account = reactive({
  name: LocalCache.getCache("name") || "",
  password: LocalCache.getCache("password") || "",
});
const formRef = ref();

const loginAction = (isKeepPassword: boolean) => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 1.判断是否需要记住密码
      if (isKeepPassword) {
        LocalCache.setCache("name", account.name);
        LocalCache.setCache("password", account.password);
      } else {
        LocalCache.deleteCache("name");
        LocalCache.deleteCache("password");
      }
      // 2.登录验证
      store.dispatch("login/accountLoginAciton", { ...account });
    }
  });
};
defineExpose({
  loginAction,
});
</script>

<style lang="less" scoped></style>
