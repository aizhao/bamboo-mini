import request from "../utils/request";

// 用户相关接口
export const userApi = {
  // 获取用户信息
  getProfile() {
    return request({
      url: "/users/profile",
      method: "get",
    });
  },

  // 更新用户信息
  updateProfile(data) {
    return request({
      url: "/users/profile",
      method: "put",
      data,
    });
  },
};

// 商品相关接口
export const productApi = {
  // 获取所有商品
  getAllProducts() {
    return request({
      url: "/products",
      method: "get",
    });
  },

  // 获取商品详情
  getProductDetail(id) {
    return request({
      url: `/products/${id}`,
      method: "get",
    });
  },

  // 获取分类商品
  getCategoryProducts(categoryId) {
    return request({
      url: `/products/category/${categoryId}`,
      method: "get",
    });
  },
};

// 订单相关接口
export const orderApi = {
  // 创建订单
  createOrder(data) {
    return request({
      url: "/orders",
      method: "post",
      data,
    });
  },

  // 获取用户订单列表
  getMyOrders() {
    return request({
      url: "/orders/my-orders",
      method: "get",
    });
  },

  // 获取订单详情
  getOrderDetail(id) {
    return request({
      url: `/orders/${id}`,
      method: "get",
    });
  },
};

// 足迹相关接口
export const footprintApi = {
  // 添加足迹
  addFootprint(data) {
    return request({
      url: "/footprints",
      method: "post",
      data,
    });
  },

  // 获取用户足迹列表
  getMyFootprints() {
    return request({
      url: "/footprints/my-footprints",
      method: "get",
    });
  },
};

// 收藏相关接口
export const favoriteApi = {
  // 添加收藏
  addFavorite(data) {
    return request({
      url: "/favorites",
      method: "post",
      data,
    });
  },

  // 取消收藏
  removeFavorite(productId) {
    return request({
      url: `/favorites/${productId}`,
      method: "delete",
    });
  },

  // 获取用户收藏列表
  getMyFavorites() {
    return request({
      url: "/favorites/my-favorites",
      method: "get",
    });
  },
};

export * from "./user";
export * from "./product";
export * from "./order";
export * from "./footprint";
export * from "./favorite";
