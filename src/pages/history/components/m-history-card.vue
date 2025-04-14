<template>
  <view class="article-card">
    <view class="article-img"></view>
    <view class="article-content">
      <view class="article-title">{{ dataList.title }}</view>
      <view class="article-desc">{{ dataList.desc }}</view>
      <view class="article-meta">
        <span>阅读 {{ dataList.read }}</span>
        <span>{{ dataList.time }}</span>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  dataList: {
    type: Object,
    default: () => {},
  },
});
</script>

<style>
.article-card {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  animation: slideIn 0.6s ease-out;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.article-img {
  width: 100%;
  height: 150px;
  background-color: #eee;
  background-image: linear-gradient(45deg, #91a967, #5a8d69);
  position: relative;
  transition: all 0.3s ease;
}

.article-img::after {
  content: "竹簧工艺";
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.article-card:hover .article-img {
  transform: scale(1.02);
}

.article-content {
  padding: 15px;
}

.article-title {
  font-size: 16px;
  margin-bottom: 8px;
}

.article-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 12px;
}
</style>
