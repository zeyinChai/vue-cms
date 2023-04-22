<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="props.labelWidth">
      <el-row>
        <template v-for="item in props.formItems" :key="item.labele">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="props.itemStyle"
            >
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="formData[`${item.field}`]"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.title"
                  />
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
  <div class="content"></div>
</template>

<script lang="ts">
export default {
  name: "formIndex",
};
</script>

<script lang="ts" setup>
import { defineProps, PropType, defineEmits, ref, watch } from "vue";
import { IFormItem } from "../types/index";
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  itemStyle: {
    type: Object,
    default: () => ({ padding: "10px 40px" }),
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6,
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
  },
});
const emit = defineEmits(["update:modelValue"]);
const formData = ref({ ...props.modelValue });

watch(
  formData,
  (newValue) => {
    // console.log(newValue);
    emit("update:modelValue", newValue);
  },
  {
    deep: true,
  }
);
// const handleValueChange = (value: any, field: string) => {
//   emit("update:modelValue", { ...props.modelValue, [field]: value });
// };
</script>

<style lang="less" scoped>
.hy-form {
  padding-top: 22px;
}
</style>
