import request from "../../utils/request";

// 创建订单
export function createOrder(data) {
  return request({
    url: "/orders",
    method: "post",
    data,
  });
}

// 获取用户订单列表
export function getMyOrders(params = {}) {
  return request({
    url: "/orders/my-orders",
    method: "get",
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      sort: params.sort || "created_at",
      order: params.order || "desc",
      status: params.status,
    },
  });
}

// 获取订单详情
export function getOrderDetail(id) {
  return request({
    url: `/orders/${id}`,
    method: "get",
  });
}
