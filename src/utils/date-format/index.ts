import { formatUtcString } from "../date-format";
// import { App } from "vue";
export default {
  install(app) {
    app.config.globalProperties.$filters = {
      foo() {
        console.log("foo");
      },
      formatTime(value: string) {
        return formatUtcString(value);
      },
    };
  },
};
