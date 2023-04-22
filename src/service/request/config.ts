// process.env.NODE_ENV 区分
// 开发环境 development
// 生成环境 production
// 测试环境 test
let TIME_OUT = 5000;
let BASE_URL = "/api";
if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
  TIME_OUT = 5000;
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "/api";
  TIME_OUT = 5000;
} else {
  BASE_URL = "/api";
  TIME_OUT = 5000;
}
export { TIME_OUT, BASE_URL };
