<template>
  <div>
    <el-form label-width="60px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify-code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" plain>获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const phone = reactive({
  number: "",
  code: "",
});
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}
</style>
