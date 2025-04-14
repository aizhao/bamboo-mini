<template>
  <view class="container">
    <view class="tabs">
      <view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="{ active: currentTab === index }" @click="switchTab(index)">
        {{ tab }}
      </view>
    </view>

    <view class="order-list">
      <view v-for="(order, index) in orders" :key="index" class="order-item">
        <view class="order-header">
          <text class="order-number">订单号：{{ order.orderNo }}</text>
          <text class="order-status" :class="order.status">{{ order.statusText }}</text>
        </view>

        <view class="order-content">
          <image :src="order.image" class="product-image" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">{{ order.name }}</text>
            <text class="product-desc">{{ order.description }}</text>
            <text class="product-price">¥{{ order.price }}</text>
          </view>
        </view>

        <view class="order-footer">
          <text class="order-time">{{ order.createTime }}</text>
          <view class="action-buttons">
            <button v-for="(action, actionIndex) in order.actions" :key="actionIndex" class="action-btn" :class="action.type" @click="handleAction(action, order)">
              {{ action.text }}
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const tabs = ["全部", "待付款", "待发货", "待收货", "已完成"];
const currentTab = ref(0);

const orders = ref([
  {
    orderNo: "B202307010001",
    status: "pending",
    statusText: "待付款",
    image: "/static/images/shop/product1.jpg",
    name: "竹编花瓶",
    description: "传统手工编织，精美实用",
    price: 299,
    createTime: "2023-07-01 14:30",
    actions: [
      { type: "cancel", text: "取消订单" },
      { type: "pay", text: "立即付款" },
    ],
  },
  {
    orderNo: "B202306300002",
    status: "shipping",
    statusText: "待收货",
    image: "/static/images/shop/product2.jpg",
    name: "竹制茶具套装",
    description: "天然竹材，环保健康",
    price: 599,
    createTime: "2023-06-30 16:45",
    actions: [
      { type: "view", text: "查看物流" },
      { type: "confirm", text: "确认收货" },
    ],
  },
]);

const switchTab = index => {
  currentTab.value = index;
  // TODO: 根据选中的标签加载对应的订单数据
};

const handleAction = (action, order) => {
  switch (action.type) {
    case "pay":
      uni.navigateTo({
        url: `/pages/user/orders/payment?orderNo=${order.orderNo}`,
      });
      break;
    case "cancel":
      uni.showModal({
        title: "提示",
        content: "确定要取消该订单吗？",
        success: res => {
          if (res.confirm) {
            // TODO: 执行取消订单操作
          }
        },
      });
      break;
    case "view":
      uni.navigateTo({
        url: `/pages/user/orders/logistics?orderNo=${order.orderNo}`,
      });
      break;
    case "confirm":
      uni.showModal({
        title: "提示",
        content: "确认已收到商品？",
        success: res => {
          if (res.confirm) {
            // TODO: 执行确认收货操作
          }
        },
      });
      break;
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
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

.order-list {
  padding: 15px;
}

.order-item {
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.order-number {
  font-size: 14px;
  color: #666;
}

.order-status {
  font-size: 14px;
  color: #5a8d69;
}

.order-status.pending {
  color: #ff6b6b;
}

.order-content {
  display: flex;
  padding: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 15px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
  display: block;
}

.product-price {
  font-size: 16px;
  color: #ff6b6b;
  font-weight: 500;
}

.order-footer {
  padding: 15px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-time {
  font-size: 12px;
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 12px;
  background-color: #f8f9fa;
  color: #666;
  border: none;
}

.action-btn.pay {
  background-color: #5a8d69;
  color: #fff;
}

.action-btn.cancel {
  background-color: #f8f9fa;
  color: #666;
}

.action-btn.view {
  background-color: #f8f9fa;
  color: #666;
}

.action-btn.confirm {
  background-color: #5a8d69;
  color: #fff;
}

/* 动画效果 */
.order-item {
  transition: transform 0.3s ease;
}

.order-item:active {
  transform: scale(0.98);
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:active {
  opacity: 0.8;
}
</style>
