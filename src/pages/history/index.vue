<template>
  <view class="page" id="yinji">
    <view class="yinji-section">
      <view class="section-title">历史背景</view>
      <MHistoryCard v-for="item in historyList" :key="item.id" :dataList="item"></MHistoryCard></view
    ><view class="yinji-section">
      <view class="section-title">技艺特色</view>
      <MHistoryCard v-for="item in artisticList" :key="item.id" :dataList="item"></MHistoryCard
    ></view>
  </view>
</template>

<script setup>
import { onLoad, onShow } from "@dcloudio/uni-app";
import { ref, onMounted, watch } from "vue";
import MHistoryCard from "./components/m-history-card.vue";
import { getHistory } from "@/api/history";
import { getToken } from "@/utils/auth";
const historyList = ref([]);
const artisticList = ref([]);
onMounted(() => {
  init();
});

const init = async () => {
  const res = await getHistory();
  console.log(res);
  historyList.value = res.data.list.filter(item => item.category !== "教程");
  artisticList.value = res.data.list.filter(item => item.category === "教程");
};
onLoad(options => {
  init();
});
onShow(() => {
  if (getToken) {
    init();
  }
});
</script>

<style scoped>
.yinji-section {
  margin-bottom: 25px;
}

.section-title {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.section-title::before {
  content: "";
  display: inline-block;
  width: 4px;
  height: 18px;
  background-color: #5a8d69;
  margin-right: 8px;
  border-radius: 2px;
}
</style>
