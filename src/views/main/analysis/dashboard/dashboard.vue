<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <Hycard title="分类商品数量(饼图)">
          <PieEchart :pieData="categoryGoodsCount"></PieEchart>
        </Hycard>
      </el-col>
      <el-col :span="10">
        <Hycard title="不同城市"></Hycard>
      </el-col>
      <el-col :span="7">
        <Hycard title="不同城市商品销量(玫瑰图)">
          <RoseEchart :roseData="categoryGoodsCount"></RoseEchart>
        </Hycard>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <Hycard title="分类商品数量">
          <LineEchart v-bind="categoryGoodsSale"></LineEchart>
        </Hycard>
      </el-col>
      <el-col :span="12">
        <Hycard title="分类商品数量"> </Hycard>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Hycard from "@/base-ui/card";
import { PieEchart, RoseEchart, LineEchart } from "@/components/page-echarts";

export default defineComponent({
  name: "dashboardIndex",
  components: {
    Hycard,
    PieEchart,
    RoseEchart,
    LineEchart,
  },
  setup() {
    const store = useStore();
    store.dispatch("dashboardModule/getDashboardAction");

    const categoryGoodsCount = computed(() => {
      return store.state.dashboardModule.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount };
      });
    });
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = [];
      const values: any[] = [];

      const categoryGoodsSale = store.state.dashboardModule.categoryGoodsSale;
      for (const item of categoryGoodsSale) {
        xLabels.push(item.name);
        values.push(item.goodsCount);
      }
      return { xLabels, values };
    });

    return { categoryGoodsCount, categoryGoodsSale };
  },
});
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
