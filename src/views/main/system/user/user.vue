<template>
  <div class="user">
    <pageSearch
      :searchformConfig="searchformConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="hanleEditData"
    />
    <PageModal
      :defaultInfo="defaultInfo"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      pageName="users"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { searchformConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import PageContent from "@/components/page-content";
import pageSearch from "@/components/page-search";
import PageModal from "@/components/page-modal";
import { modalConfig } from "./config/modal.config";
import { usePageSearch } from "@/hooks/usePageSearch";
import { usePageModal } from "@/hooks/use-page-modal";
import { useStore } from "@/store";

export default defineComponent({
  name: "userIndex",
  components: {
    pageSearch,
    PageContent,
    PageModal,
  },
  setup() {
    const { pageContentRef, handleQueryClick, handleResetClick } =
      usePageSearch();
    // pageModal相关
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      if (passwordItem) return (passwordItem.isHidden = false);
    };
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === "password"
      );
      if (passwordItem) return (passwordItem.isHidden = true);
    };
    // 动态添加部门和角色列表
    const store = useStore();
    const modalConfigRef = computed(() => {
      // 浅拷贝
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === "departmentId"
      );
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItems.find(
        (item) => item.field === "roleId"
      );
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id };
      });
      return modalConfig;
    });
    // 调用hook调取公共变量和函数
    const { pageModalRef, defaultInfo, handleNewData, hanleEditData } =
      usePageModal(newCallback, editCallback);
    return {
      searchformConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfigRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      hanleEditData,
    };
  },
});
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
