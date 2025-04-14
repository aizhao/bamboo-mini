<template>
  <view class="container">
    <view class="order-status">
      <text class="status-text">{{ order.statusText }}</text>
      <text class="status-desc">{{ order.statusDesc }}</text>
    </view>

    <view class="section">
      <view class="section-title">收货信息</view>
      <view class="address-info">
        <text class="address-name">{{ order.address.name }}</text>
        <text class="address-phone">{{ order.address.phone }}</text>
        <text class="address-detail">{{ order.address.detail }}</text>
      </view>
    </view>

    <view class="section">
      <view class="section-title">商品信息</view>
      <view class="product-info">
        <image :src="order.image" class="product-image" mode="aspectFill"></image>
        <view class="product-details">
          <text class="product-name">{{ order.name }}</text>
          <text class="product-desc">{{ order.description }}</text>
          <view class="product-price-row">
            <text class="product-price">¥{{ order.price }}</text>
            <text class="product-count">x{{ order.count }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">订单信息</view>
      <view class="order-info">
        <view class="info-item">
          <text class="info-label">订单编号</text>
          <text class="info-value">{{ order.orderNo }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">创建时间</text>
          <text class="info-value">{{ order.createTime }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">支付方式</text>
          <text class="info-value">{{ order.paymentMethod }}</text>
        </view>
        <view class="info-item">
          <text class="info-label">支付时间</text>
          <text class="info-value">{{ order.payTime }}</text>
        </view>
      </view>
    </view>

    <view class="section">
      <view class="section-title">物流信息</view>
      <view class="logistics-info">
        <view class="logistics-item" v-for="(item, index) in order.logistics" :key="index">
          <view class="logistics-time">{{ item.time }}</view>
          <view class="logistics-status">{{ item.status }}</view>
          <view class="logistics-desc">{{ item.description }}</view>
        </view>
      </view>
    </view>

    <view class="order-summary">
      <view class="summary-item">
        <text class="summary-label">商品总额</text>
        <text class="summary-value">¥{{ order.totalPrice }}</text>
      </view>
      <view class="summary-item">
        <text class="summary-label">运费</text>
        <text class="summary-value">¥{{ order.shippingFee }}</text>
      </view>
      <view class="summary-item total">
        <text class="summary-label">实付款</text>
        <text class="summary-value">¥{{ order.actualPrice }}</text>
      </view>
    </view>

    <view class="action-buttons">
      <button v-for="(action, index) in order.actions" :key="index" class="action-btn" :class="action.type" @click="handleAction(action)">
        {{ action.text }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";

const order = ref({
  orderNo: "B202307010001",
  status: "shipping",
  statusText: "待收货",
  statusDesc: "商品已发货，正在运输中",
  name: "竹编花瓶",
  description: "传统手工编织，精美实用",
  price: 299,
  count: 1,
  totalPrice: 299,
  shippingFee: 0,
  actualPrice: 299,
  image: "/static/images/shop/product1.jpg",
  createTime: "2023-07-01 14:30",
  paymentMethod: "微信支付",
  payTime: "2023-07-01 14:35",
  address: {
    name: "张三",
    phone: "13800138000",
    detail: "四川省成都市武侯区天府大道中段888号",
  },
  logistics: [
    {
      time: "2023-07-01 16:30",
      status: "已发货",
      description: "商品已从江安竹簧工艺馆发出",
    },
    {
      time: "2023-07-01 14:35",
      status: "已付款",
      description: "订单支付成功",
    },
    {
      time: "2023-07-01 14:30",
      status: "已下单",
      description: "订单创建成功",
    },
  ],
  actions: [
    { type: "view", text: "查看物流" },
    { type: "confirm", text: "确认收货" },
  ],
});

const handleAction = action => {
  switch (action.type) {
    case "view":
      uni.navigateTo({
        url: `/pages/user/orders/logistics?orderNo=${order.value.orderNo}`,
      });
      break;
    case "confirm":
      uni.showModal({
        title: "提示",
        content: "确认已收到商品？",
        success: res => {
          if (res.confirm) {
            // TODO: 执行确认收货操作
            uni.showToast({
              title: "确认收货成功",
              icon: "success",
            });
          }
        },
      });
      break;
  }
};

onMounted(() => {
  // TODO: 根据路由参数获取订单详情
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

.order-status {
  background: linear-gradient(135deg, #91a967, #5a8d69);
  padding: 30px 20px;
  color: #fff;
  text-align: center;
}

.status-text {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  display: block;
}

.status-desc {
  font-size: 14px;
  opacity: 0.9;
}

.section {
  background-color: #fff;
  margin: 10px 0;
  padding: 15px;
}

.section-title {
  font-size: 16px;
  color: #333;
  font-weight: 500;
  margin-bottom: 15px;
}

.address-info {
  line-height: 1.6;
}

.address-name {
  font-size: 15px;
  color: #333;
  margin-right: 10px;
}

.address-phone {
  font-size: 15px;
  color: #666;
}

.address-detail {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.product-info {
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
  margin-bottom: 10px;
  display: block;
}

.product-price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 16px;
  color: #ff6b6b;
  font-weight: 500;
}

.product-count {
  font-size: 14px;
  color: #999;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-size: 14px;
  color: #999;
}

.info-value {
  font-size: 14px;
  color: #666;
}

.logistics-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.logistics-item {
  position: relative;
  padding-left: 20px;
}

.logistics-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: #5a8d69;
}

.logistics-item:not(:last-child)::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 12px;
  bottom: -15px;
  width: 2px;
  background-color: #e8e8e8;
}

.logistics-time {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}

.logistics-status {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.logistics-desc {
  font-size: 12px;
  color: #666;
}

.order-summary {
  background-color: #fff;
  margin: 10px 0;
  padding: 15px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item.total {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f5f5f5;
}

.summary-label {
  font-size: 14px;
  color: #666;
}

.summary-value {
  font-size: 14px;
  color: #333;
}

.summary-item.total .summary-value {
  color: #ff6b6b;
  font-weight: 500;
}

.action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.action-btn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
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
.action-btn {
  transition: all 0.3s ease;
}

.action-btn:active {
  opacity: 0.8;
}
</style>
