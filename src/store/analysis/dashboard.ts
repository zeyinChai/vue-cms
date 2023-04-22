import { Module } from "vuex";
import { IDashboardState } from "./types";
import { IRootState } from "../types";
import {
  getCategoryAddressSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getCategoryGoodsSale,
} from "@/service/analysis/dashboard";
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: [],
    };
  },
  mutations: {
    chageCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    chageCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    chageCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    chageAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    },
  },
  actions: {
    async getDashboardAction(context) {
      const categoryCountResult = await getCategoryGoodsCount();
      context.commit("chageCategoryGoodsCount", categoryCountResult.data);
      const categorySaleResult = await getCategoryGoodsSale();
      context.commit("chageCategoryGoodsSale", categorySaleResult.data);
      const categoryFavorResult = await getCategoryGoodsFavor();
      context.commit("chageCategoryGoodsFavor", categoryFavorResult.data);
      const addressGoodsResult = await getCategoryAddressSale();
      context.commit("chageAddressGoodsSale", addressGoodsResult.data);
    },
  },
};

export default dashboardModule;
