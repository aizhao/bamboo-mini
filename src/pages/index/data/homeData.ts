import { ref } from "vue";

export const recommendList = ref([
  {
    cover: "https://bamboo-mini.oss-cn-hangzhou.aliyuncs.com/content/W020241024348368845761_ORIGIN.png",
    title: "竹簧工艺",
    description: "江安竹簧技艺的前世今生",
  },
]);
export const navList = ref([
  {
    id: 1,
    title: "印记",
    icon: "印",
    description: "探寻竹簧历史文化",
    url: "/pages/history/index",
  },
  {
    id: 2,
    title: "足迹",
    icon: "足",
    description: "非遗传承人足迹",
    url: "/pages/footprint/index",
  },
  {
    id: 3,
    title: "艺圈",
    icon: "艺",
    description: "技艺展示与交流",
    url: "/pages/art/index",
  },
  {
    id: 4,
    title: "商城",
    icon: "商",
    description: "文创作品与周边",
    url: "/pages/shop/index",
  },
]);
