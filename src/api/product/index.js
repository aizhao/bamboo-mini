import request from "../../utils/request";

// 获取所有商品
export function getAllProducts(params = {}) {
  return request({
    url: "/products",
    method: "get",
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      sort: params.sort || "created_at",
      order: params.order || "desc",
      category_id: params.category_id,
      keyword: params.keyword,
    },
  });
}

// 获取商品详情
export function getProductDetail(id) {
  return request({
    url: `/products/${id}`,
    method: "get",
  });
}

// 获取分类商品
export function getCategoryProducts(categoryId, params = {}) {
  return request({
    url: `/products/category/${categoryId}`,
    method: "get",
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      sort: params.sort || "created_at",
      order: params.order || "desc",
      keyword: params.keyword,
    },
  });
}
