import { createStore, Store, useStore as useVuexStore } from "vuex";
import { IRootState, IStoreType } from "./types";
import login from "./login/login";
import system from "./main/system/system";
import { getPageListData } from "@/service/main/system/system";
import dashboardModule from "./analysis/dashboard";

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "coderwhy",
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: [],
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, menu) {
      state.entireMenu = menu;
    },
  },
  actions: {
    async getInitialDataAction(context) {
      // 请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });

      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });
      const { list: roleList } = roleResult.data;
      const menuResult = await getPageListData("/menu/list", {
        offset: 0,
        size: 1000,
      });
      const { list: menuList } = menuResult.data;

      // 保存数据
      context.commit("changeEntireDepartment", departmentList);
      context.commit("changeEntireRole", roleList);
      context.commit("changeEntireMenu", menuList);
    },
  },
  getters: {},
  modules: {
    login,
    system,
    dashboardModule,
  },
});
export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  // store.dispatch("getInitialDataAction");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
