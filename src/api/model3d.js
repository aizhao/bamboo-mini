import request from "../utils/request";
// 获取单个3D模型详情
export const getModel3DById = id => {
  console.log("调用 getModel3DById，id:", id);
  return request.get(`/model3d/${id}`);
};

// 获取3D模型列表
export const getModel3DList = params => {
  console.log("调用 getModel3DList，参数:", params);
  return request.get("/model3d/list", params);
};
