import request from "../../utils/request";

// 添加足迹
export function addFootprint(data) {
  return request({
    url: "/footprints",
    method: "post",
    data,
  });
}

// 获取用户足迹列表
export function getMyFootprints(params = {}) {
  return request({
    url: "/footprints/my-footprints",
    method: "get",
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      sort: params.sort || "created_at",
      order: params.order || "desc",
    },
  });
}
