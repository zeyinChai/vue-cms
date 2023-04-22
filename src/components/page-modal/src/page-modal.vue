<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <Hyform v-bind="modalConfig" v-model="formData" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineExpose, watch } from "vue";
import Hyform from "@/base-ui/form";
import { useStore } from "vuex";
const props = defineProps({
  modalConfig: {
    type: Object,
    required: true,
  },
  defaultInfo: {
    type: Object,
    default: () => ({}),
  },
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    required: true,
  },
});
const dialogVisible = ref(false);
const formData = ref<any>({});
const store = useStore();
watch(
  () => props.defaultInfo,
  (newValue) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`];
    }
  }
);
// 点击确定
const handleConfirm = () => {
  dialogVisible.value = false;
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log("编辑");

    store.dispatch("system/editPageDataAciton", {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id,
    });
  } else {
    // 新建
    console.log("新建");

    store.dispatch("system/createPageDataAction", {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo },
    });
  }
};
defineExpose({
  dialogVisible,
  formData,
});
</script>

<style lang="scss" scoped></style>
