import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { ISystemState } from "./types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
    };
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list;
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count;
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    },
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  actions: {
    async getPageListAction(context, payload: any) {
      // 获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      // 如果接口不规范的情况下
      // let pageUrl = "";
      // switch (pageName) {
      //   case "users":
      //     pageUrl = "api/users/abc/list";
      //     break;
      //   case "role":
      //     pageUrl = "/role/list";
      //     break;
      // }

      //   2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);

      // 3. 将数据存储在state中
      const { list, totalCount } = pageResult.data;
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      context.commit(`change${changePageName}List`, list);
      context.commit(`change${changePageName}Count`, totalCount);

      // switch (pageName) {
      //   case "users":
      //     context.commit(`changeUserList`, list);
      //     context.commit(`changeUserCount`, totalCount);
      //     break;
      //   case "role":
      //     context.commit(`changeRoleList`, list);
      //     context.commit(`changeRoleCount`, totalCount);
      //     break;
      // }
    },
    async deletePageDataAction(context, payload: any) {
      // 1.pageName
      // 2.id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await deletePageData(pageUrl);
      // 重新请求最新的数据
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async createPageDataAction(context, payload: any) {
      // 创建数据的请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 请求最新的数据
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async editPageDataAciton(context, payload: any) {
      // 编辑数据
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      // 请求最新的数据
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
