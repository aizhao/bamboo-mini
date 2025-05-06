import request from "../../utils/request";
import { getToken} from "../../utils/auth";
const token = getToken();
// 创建订单
export function getHistory() {
  return request({
    url: "/content/list",
    method: "get",
   
  });
}

