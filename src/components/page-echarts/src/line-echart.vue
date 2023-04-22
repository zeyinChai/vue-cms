<template>
  <div class="line-echart">
    <BaseEchart :options="options"></BaseEchart>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";
import BaseEchart from "@/base-ui/echart";

const props = defineProps<{
  xLabels: string[];
  values: any[];
}>();

const options = computed(() => {
  return {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: props.xLabels,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "分类销量",
        data: props.values,
        type: "line",
        areaStyle: {},
      },
    ],
  };
});
</script>

<style lang="scss" scoped></style>
