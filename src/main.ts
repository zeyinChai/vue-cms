import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "./assets/css/index.css";
import dateFormatTime from "@/utils/date-format/index";

import router from "./router";
import store from "./store";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { setupStore } from "./store";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component as any);
}
//时间过滤器
// app.config.globalProperties.$filters = {
//   foo() {
//     console.log("foo");
//   },
//   formatTime(value: string) {
//     return formatUtcString(value);
//   },
// };
app.use(dateFormatTime as any);
setupStore();
app.use(store as any);
app.use(router as any);

app.mount("#app");
