import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import LocalCache from "@/utils/cache";
import { firstMenu } from "@/utils/map-menus";
import { mapMenusToRoutes } from "@/utils/map-menus";
import store from "@/store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue"),
    // 根据userMenus来决定的
    // children: [],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/views/not-found/not-found.vue"),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});
router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = LocalCache.getCache("token");
    if (!token) {
      return "/login";
    }

    // console.log(routes);
    console.log("firstMenu", firstMenu);

    if (to.path === "/main") {
      return firstMenu.url;
    }
  }
});
export default router;
