import { ref } from "vue";

export const menuList = ref([
  { id: 1, name: "我的订单", icon: "🛒", path: "/pages/user/orders/index" },
  { id: 2, name: "我的收藏", icon: "💖", path: "/pages/user/favorites/index" },
  { id: 3, name: "我的足迹", icon: "👣", path: "/pages/user/footprint/index" },
  { id: 4, name: "我的数字藏品", icon: "💎", path: "/pages/user/digitalCollection/index" },
  { id: 5, name: "我的钱包", icon: "💰", path: "/pages/user/wallet/index" },
  { id: 6, name: "设置", icon: "⚙️", path: "/pages/user/settings/index" },
]);
