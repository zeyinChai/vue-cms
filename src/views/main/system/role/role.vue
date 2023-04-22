<template>
  <div class="role">
    <PageSearch :searchformConfig="searchformConfig" />
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="hanleEditData"
    />
    <pageModal
      :modalConfig="modalConfig"
      pageName="role"
      :otherInfo="otherInfo"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    >
      <div class="menu-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </pageModal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import pageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";
import pageModal from "@/components/page-modal";
import { searchformConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";
import { usePageModal } from "@/hooks/use-page-modal";
import { useStore } from "@/store";
import { menuMapLeafKeys } from "@/utils/map-menus";

export default defineComponent({
  name: "roleIndex",
  components: {
    pageContent,
    PageSearch,
    pageModal,
  },
  setup() {
    const elTreeRef = ref();
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList);
      nextTick(() => {
        elTreeRef.value.setCheckedKeys(leafKeys, false);
      });
    };
    const { pageModalRef, defaultInfo, handleNewData, hanleEditData } =
      usePageModal(undefined, editCallback);
    const store = useStore();
    const menus = computed(() => {
      return store.state.entireMenu;
    });
    const otherInfo = ref({});
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      otherInfo.value = { menuList };
      console.log(otherInfo.value);
    };
    return {
      contentTableConfig,
      searchformConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      hanleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      editCallback,
      elTreeRef,
    };
  },
});
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
