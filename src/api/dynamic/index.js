import request from "../../utils/request";
import { getToken } from "../../utils/auth";
const token = getToken();
// 创建订单
export function getDynamic() {
  return request({
    url: "/dynamic/list",
    method: "get",
  });
}

// 发表评论
export function addComment(dynamicId, data) {
  return request({
    url: `/dynamic/${dynamicId}/comments`,
    method: "post",
    data,
  });
}

// 获取评论列表
export function getComments(dynamicId) {
  return request({
    url: `/dynamic/${dynamicId}/comments`,
    method: "get",
  });
}
