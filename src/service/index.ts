// service统一出口
import HYRequest from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});
// export const hyRequest2 = new HYRequest({
//   baseURL: "地址2",
// });

export default hyRequest;
