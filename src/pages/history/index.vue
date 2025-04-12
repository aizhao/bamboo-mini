<template>
  <view class="container">
    <view class="timeline">
      <view class="timeline-item" v-for="(item, index) in historyList" :key="index">
        <view class="timeline-dot"></view>
        <view class="timeline-content">
          <text class="timeline-year">{{ item.year }}</text>
          <image class="timeline-image" :src="item.image" mode="aspectFill"></image>
          <text class="timeline-title">{{ item.title }}</text>
          <text class="timeline-desc">{{ item.description }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const historyList = ref([
  {
    year: "1950s",
    image: "/static/images/history/1950.jpg",
    title: "竹簧技艺的起源",
    description: "江安竹簧技艺始于上世纪50年代，由当地能工巧匠开创...",
  },
  {
    year: "1980s",
    image: "/static/images/history/1980.jpg",
    title: "技艺的传承与发展",
    description: "80年代，竹簧技艺得到进一步发展和创新...",
  },
  {
    year: "2000s",
    image: "/static/images/history/2000.jpg",
    title: "非物质文化遗产",
    description: "竹簧技艺被列入非物质文化遗产名录...",
  },
]);
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #5a8d69;
}

.timeline-item {
  position: relative;
  padding-left: 50px;
  margin-bottom: 30px;
}

.timeline-dot {
  position: absolute;
  left: 16px;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #5a8d69;
}

.timeline-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.timeline-year {
  font-size: 20px;
  font-weight: bold;
  color: #5a8d69;
  margin-bottom: 10px;
  display: block;
}

.timeline-image {
  width: 100%;
  height: 150px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.timeline-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
}

.timeline-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>
