import request from "../../utils/request";

// 添加收藏
export function addFavorite(data) {
  return request({
    url: "/favorites",
    method: "post",
    data,
  });
}

// 取消收藏
export function removeFavorite(productId) {
  return request({
    url: `/favorites/${productId}`,
    method: "delete",
  });
}

// 获取用户收藏列表
export function getMyFavorites(params = {}) {
  return request({
    url: "/favorites/my-favorites",
    method: "get",
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      sort: params.sort || "created_at",
      order: params.order || "desc",
    },
  });
}
