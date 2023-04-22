<template>
  <div class="page-search">
    <div class="search">
      <Hyform v-bind="searchformConfig" v-model="formData">
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button @click="handleResetClick">
              <el-icon>
                <Refresh />
              </el-icon>
              重置
            </el-button>
            <el-button type="primary" @click="handleQueryClick">
              <el-icon>
                <Search />
              </el-icon>
              搜索
            </el-button>
          </div>
        </template>
      </Hyform>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";
import Hyform from "@/base-ui/form";
const props = defineProps({
  searchformConfig: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["resetBtnClick", "queryBtnClick"]);
// 优化1 formData中的属性应该动态来决定
const formItems = props.searchformConfig.formItems || [];
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = "";
}
const formData = ref(formOriginData);
// 优化2 用户点击了重置
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key];
  }
  emit("resetBtnClick");
};
// 优化3 当用户点击了搜索
const handleQueryClick = () => {
  emit("queryBtnClick", formData.value);
};
</script>

<style lang="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
