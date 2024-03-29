import { IBreadcrumb } from "@/base-ui/breadcrumb";
import type { RouteRecordRaw } from "vue-router";
let firstMenu: any = null;
// interface menuList {
//   children: any[];
// }
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts/);
  routeFiles.keys().forEach((keys) => {
    const route = require("../router/main" + keys.split(".")[1]);
    allRoutes.push(route.default);
  });
  //   console.log(allRoutes);

  // 2.根据菜单获取需要添加的routes
  //   userMenus :
  //   type === 1 -> children -> type === 1
  //   type === 2 -> url -> route
  console.log(allRoutes, "allRoutes");

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // 当所有路由allRoutes的中的path === 用户菜单中的url时 说明满足条件 返回满足的路由信息保存在route中
        const route = allRoutes.find((route) => route.path === menu.url);
        // console.log(route);
        if (route) routes.push(route);
        if (!firstMenu) {
          firstMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };

  _recurseGetRoute(userMenus);
  return routes;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children || [], currentPath);
      if (findMenu) {
        breadcrumbs.push({ name: menu.name });
        breadcrumbs.push({ name: findMenu.name });
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
  console.log(breadcrumbs);

  return breadcrumbs;
}

export function pathMapToMenu(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children || [], currentPath);
      if (findMenu) {
        return findMenu;
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu;
    }
  }
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];
  const _recurseGetPermisson = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermisson(menu.children || []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermisson(userMenus);
  return permissions;
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);
  return leftKeys;
}
export { firstMenu };
