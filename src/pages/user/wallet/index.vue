<template>
  <view class="container">
    <view class="wallet-header">
      <view class="balance-section">
        <text class="balance-label">账户余额</text>
        <text class="balance-amount">¥{{ balance }}</text>
        <view class="action-buttons">
          <button class="action-btn" @click="handleRecharge">
            <text class="btn-icon">💰</text>
            充值
          </button>
          <button class="action-btn" @click="handleWithdraw">
            <text class="btn-icon">💳</text>
            提现
          </button>
        </view>
      </view>
    </view>

    <view class="wallet-content">
      <view class="section-title">
        <text>交易记录</text>
        <text class="filter-text" @click="showFilter">筛选</text>
      </view>

      <view class="transaction-list">
        <view class="transaction-item" v-for="(item, index) in transactions" :key="index">
          <view class="transaction-icon" :class="item.type">
            {{ item.icon }}
          </view>
          <view class="transaction-info">
            <text class="transaction-title">{{ item.title }}</text>
            <text class="transaction-time">{{ item.time }}</text>
          </view>
          <view class="transaction-amount" :class="{ income: item.isIncome }"> {{ item.isIncome ? "+" : "-" }}¥{{ item.amount }} </view>
        </view>
      </view>
    </view>

    <!-- 底部快捷操作 -->
    <view class="quick-actions">
      <view class="quick-action-item" v-for="(action, index) in quickActions" :key="index" @click="handleQuickAction(action)">
        <text class="quick-action-icon">{{ action.icon }}</text>
        <text class="quick-action-label">{{ action.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const balance = ref(1234.56);

const transactions = ref([
  {
    type: "purchase",
    icon: "🛍️",
    title: "购买竹簧工艺品",
    time: "2023-07-01 14:30",
    amount: 299,
    isIncome: false,
  },
  {
    type: "recharge",
    icon: "💰",
    title: "余额充值",
    time: "2023-07-01 10:20",
    amount: 1000,
    isIncome: true,
  },
  {
    type: "withdraw",
    icon: "💳",
    title: "余额提现",
    time: "2023-06-30 16:45",
    amount: 500,
    isIncome: false,
  },
]);

const quickActions = ref([
  { icon: "📱", label: "扫一扫", action: "scan" },
  { icon: "🧾", label: "账单", action: "bill" },
  { icon: "🎁", label: "优惠券", action: "coupon" },
  { icon: "⚙️", label: "设置", action: "settings" },
]);

const handleRecharge = () => {
  uni.navigateTo({
    url: "/pages/user/wallet/recharge",
  });
};

const handleWithdraw = () => {
  uni.navigateTo({
    url: "/pages/user/wallet/withdraw",
  });
};

const showFilter = () => {
  uni.showActionSheet({
    itemList: ["全部", "收入", "支出", "最近一周", "最近一月"],
    success: res => {
      console.log("选择筛选条件:", res.tapIndex);
    },
  });
};

const handleQuickAction = action => {
  switch (action.action) {
    case "scan":
      uni.scanCode({
        success: res => {
          console.log("扫码结果:", res);
        },
      });
      break;
    case "bill":
      uni.navigateTo({ url: "/pages/user/wallet/bill" });
      break;
    case "coupon":
      uni.navigateTo({ url: "/pages/user/wallet/coupon" });
      break;
    case "settings":
      uni.navigateTo({ url: "/pages/user/wallet/settings" });
      break;
  }
};
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.wallet-header {
  background: linear-gradient(135deg, #91a967, #5a8d69);
  padding: 30px 20px;
  color: #fff;
}

.balance-section {
  text-align: center;
}

.balance-label {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 10px;
  display: block;
}

.balance-amount {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  display: block;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.btn-icon {
  margin-right: 4px;
}

.wallet-content {
  padding: 20px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
}

.filter-text {
  font-size: 14px;
  color: #666;
}

.transaction-list {
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.transaction-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
}

.transaction-item:last-child {
  border-bottom: none;
}

.transaction-icon {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
}

.transaction-info {
  flex: 1;
}

.transaction-title {
  font-size: 15px;
  color: #333;
  margin-bottom: 4px;
  display: block;
}

.transaction-time {
  font-size: 12px;
  color: #999;
}

.transaction-amount {
  font-size: 16px;
  font-weight: 500;
  color: #ff6b6b;
}

.transaction-amount.income {
  color: #5a8d69;
}

.quick-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  padding: 15px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.quick-action-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.quick-action-icon {
  font-size: 24px;
}

.quick-action-label {
  font-size: 12px;
  color: #666;
}

/* 动画效果 */
.transaction-item {
  transition: background-color 0.3s ease;
}

.transaction-item:active {
  background-color: #f8f9fa;
}

.action-btn {
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.95);
  opacity: 0.8;
}
</style>
