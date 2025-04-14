<template>
  <view class="container">
    <view class="tabs">
      <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === index }" @click="switchTab(index)">
        {{ tab }}
      </view>
    </view>

    <view class="favorites-grid">
      <view v-for="(item, index) in favorites" :key="index" class="favorite-item" @click="viewDetail(item)">
        <image :src="item.image" class="item-image" mode="aspectFill"></image>
        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-desc">{{ item.description }}</text>
          <view class="item-footer">
            <text class="item-price">¥{{ item.price }}</text>
            <view class="item-actions">
              <button class="action-btn cart" @click.stop="addToCart(item)">
                <text class="btn-icon">🛒</text>
              </button>
              <button class="action-btn delete" @click.stop="removeFavorite(item)">
                <text class="btn-icon">❌</text>
              </button>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view v-if="favorites.length === 0" class="empty-state">
      <text class="empty-icon">💔</text>
      <text class="empty-text">暂无收藏</text>
      <button class="browse-btn" @click="goToShop">去逛逛</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["全部", "竹编", "竹雕", "竹画", "其他"];
const currentTab = ref(0);

const favorites = ref([
  {
    id: 1,
    name: "竹编花瓶",
    description: "传统手工编织，精美实用",
    price: 299,
    image: "/static/images/shop/product1.jpg",
    category: "竹编",
  },
  {
    id: 2,
    name: "竹制茶具套装",
    description: "天然竹材，环保健康",
    price: 599,
    image: "/static/images/shop/product2.jpg",
    category: "竹编",
  },
  {
    id: 3,
    name: "竹雕摆件",
    description: "精雕细琢，栩栩如生",
    price: 399,
    image: "/static/images/shop/product3.jpg",
    category: "竹雕",
  },
]);

const switchTab = index => {
  currentTab.value = index;
  // TODO: 根据选中的标签筛选收藏内容
};

const viewDetail = item => {
  uni.navigateTo({
    url: `/pages/shop/detail?id=${item.id}`,
  });
};

const addToCart = item => {
  uni.showToast({
    title: "已加入购物车",
    icon: "success",
  });
  // TODO: 实现加入购物车逻辑
};

const removeFavorite = item => {
  uni.showModal({
    title: "提示",
    content: "确定要取消收藏吗？",
    success: res => {
      if (res.confirm) {
        // TODO: 实现取消收藏逻辑
        uni.showToast({
          title: "已取消收藏",
          icon: "success",
        });
      }
    },
  });
};

const goToShop = () => {
  uni.switchTab({
    url: "/pages/shop/index",
  });
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 20px;
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

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
}

.favorite-item {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.item-image {
  width: 100%;
  height: 160px;
}

.item-info {
  padding: 12px;
}

.item-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.item-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  display: block;
}

.item-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 16px;
  color: #ff6b6b;
  font-weight: 500;
}

.item-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  padding: 0;
}

.action-btn.cart {
  background-color: #5a8d69;
  color: #fff;
}

.action-btn.delete {
  background-color: #f8f9fa;
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
.favorite-item {
  transition: transform 0.3s ease;
}

.favorite-item:active {
  transform: scale(0.98);
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:active {
  opacity: 0.8;
}
</style>
