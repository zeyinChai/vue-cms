<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick"><Expand /></el-icon>
    <div class="content">
      <div>
        <HyBreadcrumb :breadcrumbs="breadcrumbs" />
      </div>
      <div>
        <UserInfo />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from "vue";
import UserInfo from "./user-info.vue";
import HyBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import { pathMapBreadcrumbs } from "@/utils/map-menus";
import { useStore } from "@/store";
import { useRoute } from "vue-router";

const isFold = ref(false);
const emit = defineEmits(["foldChange"]);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emit("foldChange", isFold.value);
};

// 面包屑数据 [{name:,path:}]
const store = useStore();
const breadcrumbs = computed(() => {
  const userMenus = store.state.login.userMenus;
  const route = useRoute();
  const currentPath = route.path;
  return pathMapBreadcrumbs(userMenus, currentPath);
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 25px;
    vertical-align: middle;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
