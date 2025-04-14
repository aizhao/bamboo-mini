<template>
  <view class="container">
    <view class="page active">
      <!-- 顶部标题 -->
      <!-- 主图区域 -->
      <view class="banner">
        <text class="banner-text">江安竹簧非遗文化</text>
      </view>

      <!-- 四个功能模块 -->
      <view class="grid-container">
        <view class="grid-item" v-for="item in navList" :key="item.id" @click="goTOPage(item)">
          <text class="icon">{{ item.icon }}</text>
          <text class="grid-title">{{ item.title }}</text>
          <text class="grid-desc">{{ item.description }}</text>
        </view>
      </view>

      <!-- 推荐区域 -->
      <view class="recommend">
        <text class="section-title">非遗推荐</text>
        <y-card v-for="(item, index) in recommendList" :key="index" :cover="item.cover" :title="item.title" :description="item.description" />
      </view>
    </view>
  </view>
</template>

<script setup>
import { recommendList, navList } from "./data/homeData";
import YCard from "@/components/home/y-card.vue";

const goTOPage = data => {
  if (data.id != 2)
    uni.switchTab({
      url: data.url,
    });
  else uni.navigateTo({ url: data.url });
};
</script>

<style scoped>
.container {
  max-width: 414px;
  margin: 0 auto;
  background-color: white;
  min-height: 100vh;
  position: relative;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}
.page {
  padding: 15px;
  display: none;
  height: calc(100vh - 60px);
  overflow-y: auto;
}
.page.active {
  display: block;
}
.header {
  padding: 20px;
  background-color: #fff;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.banner {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #91a967, #5a8d69);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-size: 24px;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.8s ease-out;
}
.banner::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05));
  z-index: 1;
}
.banner::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M30,10 Q50,0 70,10 T90,20 T70,30 T50,40 T30,50' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2'/%3E%3C/svg%3E");
  background-size: 100px;
  opacity: 0.3;
}
.banner-text {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.grid-item {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 15px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: scaleIn 0.5s ease-out;
  animation-fill-mode: both;
}
.grid-item:nth-child(1) {
  animation-delay: 0.1s;
}
.grid-item:nth-child(2) {
  animation-delay: 0.2s;
}
.grid-item:nth-child(3) {
  animation-delay: 0.3s;
}
.grid-item:nth-child(4) {
  animation-delay: 0.4s;
}
.grid-item:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.icon-wrapper {
  width: 60px;
  height: 60px;
  background-color: #e8f5e9;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
  background-color: #f0f7eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #5a8d69;
  transition: all 0.3s ease;
}
.grid-item:hover .icon {
  transform: rotate(5deg);
  background-color: #5a8d69;
  color: white;
}
.grid-title {
  font-size: 16px;
  margin-bottom: 5px;
  display: block;
}

.grid-desc {
  font-size: 12px;
  color: #999;
  display: block;
}

.recommend {
  padding: 20px;
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
