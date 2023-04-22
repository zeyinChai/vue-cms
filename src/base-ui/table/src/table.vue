<template>
  <div class="hy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ props.title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="props.listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="props.showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="props.showIndexColumn"
        type="index"
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <template v-for="propItem in props.propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :currentPage="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "tableIndex",
};
</script>

<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose, ref } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "title",
  },
  listData: {
    type: Array,
    required: true,
  },
  listCount: {
    type: Number,
    default: 0,
  },
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  propList: {
    type: Array,
    required: true,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 }),
  },
  childrenProps: {
    type: Object,
    default: () => ({}),
  },
  showFooter: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["selectionChange", "update:page"]);
const handleSizeChange = (pageSize: number) => {
  emit("update:page", { ...props.page, pageSize });
};
const handleCurrentChange = (currentPage: number) => {
  emit("update:page", { ...props.page, currentPage });
};
defineExpose({ handleSizeChange, handleCurrentChange });
const handleSelectionChange = (value: any) => {
  // console.log(value);
  emit("selectionChange", value);
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;
  margin-left: 200px;

  .el-pagination {
    text-align: right;
  }
}
</style>
