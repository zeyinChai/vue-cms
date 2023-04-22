<template>
  <div class="menu">
    <pageContent
      :contentTableConfig="contentTableConfig"
      pageName="menu"
    ></pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import pageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "menuIndex",
  components: {
    pageContent,
  },
  setup() {
    return { contentTableConfig };
  },
});
</script>

<style scoped></style>
