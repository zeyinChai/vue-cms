<template>
  <div class="page-content">
    <HyTable
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
      v-model:page="pageInfo"
    >
      <!-- header的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          size="small"
          plain
          :type="scope.row.enable ? 'success' : 'danger'"
        >
          {{ scope.row.enable ? "启用" : "禁用" }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            size="mini"
            type="text"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            size="mini"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </HyTable>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  computed,
  defineExpose,
  ref,
  watch,
  defineEmits,
} from "vue";
import { useStore } from "vuex";
import HyTable from "@/base-ui/table";
import { usePermission } from "@/hooks/use-permissison";
const props = defineProps({
  contentTableConfig: {
    type: Object,
    require: true,
  },
  pageName: {
    type: String,
    require: true,
  },
});
const store = useStore();
// 权限
const isCreate = usePermission(props.pageName, "create");
const isUpdate = usePermission(props.pageName, "update");
const isDelete = usePermission(props.pageName, "delete");
const isQuery = usePermission(props.pageName, "query");
// 双向绑定pageInfo
const pageInfo = ref({ currentPage: 1, pageSize: 10 });
watch(
  pageInfo,
  () => {
    getPageData();
  },
  { deep: true }
);
// 发送请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return;
  store.dispatch("system/getPageListAction", {
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo,
    },
  });
};
getPageData();
defineExpose({ getPageData });
// 从vuex中获取数据
const dataList = computed(
  () => store.getters["system/pageListData"](props.pageName)
  // store.getters.system.pageListData(props.pageName)
);
console.log(dataList);

const dataCount = computed(() =>
  store.getters["system/pageListCount"](props.pageName)
);
// 获取其他的动态插槽名称
const otherPropSlots = (props.contentTableConfig as any).propList.filter(
  (item) => {
    if (item.slotName === "status") return false;
    if (item.slotName === "createAt") return false;
    if (item.slotName === "updateAt") return false;
    if (item.slotName === "handler") return false;
    return true;
  }
);
// 删除/编辑 操作
const emit = defineEmits(["newBtnClick", "editBtnClick"]);
const handleDeleteClick = (item: any) => {
  console.log(item);
  store.dispatch("system/deletePageDataAction", {
    pageName: props.pageName,
    id: item.id,
  });
};
const handleNewClick = () => {
  emit("newBtnClick");
};
const handleEditClick = (item: any) => {
  emit("editBtnClick", item);
};
</script>

<style lang="less" scoped></style>
