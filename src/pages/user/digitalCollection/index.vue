<template>
  <view class="container">
    <view class="header">
      <text class="title">我的数字藏品</text>
      <text class="subtitle">共 {{ collections.length }} 件藏品</text>
    </view>

    <view class="tabs">
      <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === index }" @click="switchTab(index)">
        {{ tab }}
      </view>
    </view>

    <view class="collection-grid">
      <view v-for="(item, index) in collections" :key="index" class="collection-item" @click="viewDetail(item)">
        <image :src="item.image" class="collection-image" mode="aspectFill"></image>
        <view class="collection-info">
          <text class="collection-name">{{ item.name }}</text>
          <text class="collection-number">#{{ item.number }}</text>
          <view class="collection-meta">
            <text class="meta-label">发行方</text>
            <text class="meta-value">{{ item.issuer }}</text>
          </view>
          <view class="collection-meta">
            <text class="meta-label">发行日期</text>
            <text class="meta-value">{{ item.issueDate }}</text>
          </view>
          <view class="collection-rarity" :style="{ color: item.rarityColor }">
            {{ item.rarity }}
          </view>
          <view class="collection-chain">
            <text class="chain-icon">⛓️</text>
            <text class="chain-text">{{ item.blockchain }}</text>
          </view>
        </view>
      </view>
    </view>

    <view v-if="collections.length === 0" class="empty-state">
      <text class="empty-icon">💎</text>
      <text class="empty-text">暂无数字藏品</text>
      <button class="browse-btn" @click="goToMarket">去市场看看</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["全部", "普通", "稀有", "传说"];
const currentTab = ref(0);

const collections = ref([
  {
    id: 1,
    name: "竹编花瓶 NFT",
    number: "001",
    image: "/static/images/shop/product1.jpg",
    issuer: "江安竹簧工艺馆",
    issueDate: "2023-06-15",
    rarity: "稀有",
    rarityColor: "#ff6b6b",
    blockchain: "以太坊",
  },
  {
    id: 2,
    name: "竹雕摆件 NFT",
    number: "002",
    image: "/static/images/shop/product3.jpg",
    issuer: "竹艺传承中心",
    issueDate: "2023-06-20",
    rarity: "普通",
    rarityColor: "#5a8d69",
    blockchain: "以太坊",
  },
  {
    id: 3,
    name: "竹簧茶具 NFT",
    number: "003",
    image: "/static/images/shop/product2.jpg",
    issuer: "非遗数字艺术馆",
    issueDate: "2023-06-25",
    rarity: "传说",
    rarityColor: "#ffd700",
    blockchain: "以太坊",
  },
]);

const switchTab = index => {
  currentTab.value = index;
  // TODO: 根据选中的标签筛选藏品
};

const viewDetail = item => {
  uni.navigateTo({
    url: `/pages/digitalCollection/detail?id=${item.id}`,
  });
};

const goToMarket = () => {
  uni.navigateTo({
    url: "/pages/digitalCollection/market",
  });
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 20px;
}

.header {
  padding: 20px 15px;
  background-color: #fff;
  margin-bottom: 10px;
}

.title {
  font-size: 20px;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}

.subtitle {
  font-size: 14px;
  color: #999;
}

.tabs {
  display: flex;
  background-color: #fff;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  position: relative;
}

.tab-item.active {
  color: #5a8d69;
  font-weight: 500;
}

.tab-item.active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background-color: #5a8d69;
  border-radius: 3px;
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
}

.collection-item {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.collection-image {
  width: 100%;
  height: 160px;
}

.collection-info {
  padding: 12px;
}

.collection-name {
  font-size: 15px;
  color: #333;
  font-weight: 500;
  margin-bottom: 4px;
  display: block;
}

.collection-number {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  display: block;
}

.collection-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.meta-label {
  font-size: 12px;
  color: #999;
}

.meta-value {
  font-size: 12px;
  color: #666;
}

.collection-rarity {
  font-size: 12px;
  font-weight: 500;
  margin: 8px 0;
  display: block;
}

.collection-chain {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.chain-icon {
  font-size: 12px;
  margin-right: 4px;
}

.chain-text {
  font-size: 12px;
  color: #666;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 16px;
  color: #999;
  margin-bottom: 20px;
}

.browse-btn {
  background-color: #5a8d69;
  color: #fff;
  border: none;
  padding: 8px 30px;
  border-radius: 20px;
  font-size: 14px;
}

/* 动画效果 */
.collection-item {
  transition: transform 0.3s ease;
}

.collection-item:active {
  transform: scale(0.98);
}

.browse-btn {
  transition: all 0.3s ease;
}

.browse-btn:active {
  opacity: 0.8;
}
</style>
