import { Module } from "vuex";
import { ILoginState } from "./types";
import { IRootState } from "../types";
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from "@/service/login/login";
import LocalCache from "@/utils/cache";
import router from "@/router";
import { mapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: {},
      permissions: [],
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus;
      // userMenus -> routes
      const routes = mapMenusToRoutes(userMenus);
      console.log(routes, "---------------");
      // 将routes -> router.main.children
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      // console.log(router.options);

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus);
      state.permissions = permissions;
    },
  },
  actions: {
    async accountLoginAciton(context, payload: any) {
      //   1.实现登录逻
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      context.commit("changeToken", token);
      LocalCache.setCache("token", token);
      // 发送初始化的请求(完整的role/department)
      context.dispatch("getInitialDataAction", null, { root: true });
      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      context.commit("changeUserInfo", userInfo);
      LocalCache.setCache("userInfo", userInfo);
      // 3.请求用户的菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      context.commit("changeUserMenus", userMenus);
      LocalCache.setCache("userMenus", userMenus);
      // 4.跳到首页
      router.push("/main");
    },
    // 重新加载信息
    loadLocalLogin(context) {
      const token = LocalCache.getCache("token");
      if (token) {
        context.commit("changeToken", token);
        context.dispatch("getInitialDataAction", null, { root: true });
      }
      const userInfo = LocalCache.getCache("userInfo");
      if (userInfo) {
        context.commit("changeUserInfo", userInfo);
      }
      const userMenus = LocalCache.getCache("userMenus");
      if (userMenus) {
        context.commit("changeUserMenus", userMenus);
      }
    },
  },
  getters: {},
};

export default loginModule;
