<template>
  <view class="container">
    <view class="logistics-header">
      <view class="delivery-info">
        <text class="delivery-company">江安竹簧工艺馆</text>
        <text class="delivery-no">物流单号：{{ logistics.deliveryNo }}</text>
      </view>
      <view class="delivery-status">
        <text class="status-text">{{ logistics.statusText }}</text>
        <text class="status-desc">{{ logistics.statusDesc }}</text>
      </view>
    </view>

    <view class="logistics-timeline">
      <view class="timeline-item" v-for="(item, index) in logistics.timeline" :key="index" :class="{ active: index === 0 }">
        <view class="timeline-dot"></view>
        <view class="timeline-content">
          <text class="timeline-time">{{ item.time }}</text>
          <text class="timeline-status">{{ item.status }}</text>
          <text class="timeline-location">{{ item.location }}</text>
        </view>
      </view>
    </view>

    <view class="product-info">
      <view class="section-title">商品信息</view>
      <view class="product-card">
        <image :src="logistics.product.image" class="product-image" mode="aspectFill"></image>
        <view class="product-details">
          <text class="product-name">{{ logistics.product.name }}</text>
          <text class="product-desc">{{ logistics.product.description }}</text>
        </view>
      </view>
    </view>

    <view class="contact-info">
      <view class="section-title">物流信息</view>
      <view class="info-item">
        <text class="info-label">收件人</text>
        <text class="info-value">{{ logistics.contact.name }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">联系电话</text>
        <text class="info-value">{{ logistics.contact.phone }}</text>
      </view>
      <view class="info-item">
        <text class="info-label">收货地址</text>
        <text class="info-value">{{ logistics.contact.address }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const logistics = ref({
  deliveryNo: "SF1234567890",
  statusText: "运输中",
  statusDesc: "快件已到达【成都转运中心】",
  product: {
    name: "竹编花瓶",
    description: "传统手工编织，精美实用",
    image: "/static/images/shop/product1.jpg",
  },
  contact: {
    name: "张三",
    phone: "13800138000",
    address: "四川省成都市武侯区天府大道中段888号",
  },
  timeline: [
    {
      time: "2023-07-02 10:30",
      status: "快件已到达【成都转运中心】",
      location: "成都转运中心",
    },
    {
      time: "2023-07-01 16:30",
      status: "快件已从【江安竹簧工艺馆】发出",
      location: "江安竹簧工艺馆",
    },
    {
      time: "2023-07-01 14:35",
      status: "商家已发货",
      location: "江安竹簧工艺馆",
    },
  ],
});

onMounted(() => {
  // TODO: 根据路由参数获取物流信息
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const { orderNo } = currentPage.$page.options;
  console.log("订单号:", orderNo);
});
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 20px;
}

.logistics-header {
  background: linear-gradient(135deg, #91a967, #5a8d69);
  padding: 20px;
  color: #fff;
}

.delivery-info {
  margin-bottom: 15px;
}

.delivery-company {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}

.delivery-no {
  font-size: 14px;
  opacity: 0.9;
}

.delivery-status {
  text-align: center;
}

.status-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 5px;
  display: block;
}

.status-desc {
  font-size: 14px;
  opacity: 0.9;
}

.logistics-timeline {
  background-color: #fff;
  margin: 10px;
  padding: 20px;
  border-radius: 10px;
}

.timeline-item {
  position: relative;
  padding-left: 20px;
  padding-bottom: 20px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #e8e8e8;
}

.timeline-item.active .timeline-dot {
  background-color: #5a8d69;
}

.timeline-item:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 12px;
  bottom: 0;
  width: 2px;
  background-color: #e8e8e8;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.timeline-time {
  font-size: 12px;
  color: #999;
}

.timeline-status {
  font-size: 14px;
  color: #333;
}

.timeline-location {
  font-size: 12px;
  color: #666;
}

.product-info {
  background-color: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
}

.section-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 15px;
}

.product-card {
  display: flex;
  gap: 15px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
}

.product-details {
  flex: 1;
}

.product-name {
  font-size: 15px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.product-desc {
  font-size: 12px;
  color: #999;
}

.contact-info {
  background-color: #fff;
  margin: 10px;
  padding: 15px;
  border-radius: 10px;
}

.info-item {
  display: flex;
  margin-bottom: 10px;
}

.info-label {
  width: 80px;
  font-size: 14px;
  color: #999;
}

.info-value {
  flex: 1;
  font-size: 14px;
  color: #333;
}

/* 动画效果 */
.timeline-item {
  transition: all 0.3s ease;
}

.timeline-item.active {
  transform: scale(1.02);
}
</style>
