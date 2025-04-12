<template>
  <view class="container">
    <swiper class="banner" circular autoplay interval="3000">
      <swiper-item v-for="(item, index) in banners" :key="index">
        <image :src="item.image" mode="aspectFill" class="banner-image"></image>
      </swiper-item>
    </swiper>

    <view class="category-grid">
      <view class="category-item" v-for="(item, index) in categories" :key="index">
        <image :src="item.icon" class="category-icon"></image>
        <text class="category-name">{{ item.name }}</text>
      </view>
    </view>

    <view class="product-section">
      <view class="section-header">
        <text class="section-title">热门商品</text>
        <text class="section-more">查看更多</text>
      </view>
      <view class="product-grid">
        <view class="product-item" v-for="(item, index) in products" :key="index">
          <image :src="item.image" mode="aspectFill" class="product-image"></image>
          <view class="product-info">
            <text class="product-title">{{ item.title }}</text>
            <text class="product-price">¥{{ item.price }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const banners = ref([{ image: "/static/images/shop/banner1.jpg" }, { image: "/static/images/shop/banner2.jpg" }, { image: "/static/images/shop/banner3.jpg" }]);

const categories = ref([
  { name: "竹簧工艺品", icon: "/static/images/shop/category1.png" },
  { name: "文创用品", icon: "/static/images/shop/category2.png" },
  { name: "传统器具", icon: "/static/images/shop/category3.png" },
  { name: "限量收藏", icon: "/static/images/shop/category4.png" },
]);

const products = ref([
  {
    image: "/static/images/shop/product1.jpg",
    title: "传统竹簧编织篮",
    price: 299,
  },
  {
    image: "/static/images/shop/product2.jpg",
    title: "现代竹簧装饰画",
    price: 499,
  },
  {
    image: "/static/images/shop/product3.jpg",
    title: "竹簧工艺摆件",
    price: 199,
  },
  {
    image: "/static/images/shop/product4.jpg",
    title: "竹簧收纳盒",
    price: 159,
  },
]);
</script>

<style scoped>
.container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.banner {
  height: 200px;
  margin-bottom: 15px;
}

.banner-image {
  width: 100%;
  height: 100%;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 15px;
  background-color: #fff;
  margin-bottom: 15px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.category-icon {
  width: 40px;
  height: 40px;
  margin-bottom: 5px;
}

.category-name {
  font-size: 12px;
  color: #333;
}

.product-section {
  background-color: #fff;
  padding: 15px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
}

.section-more {
  font-size: 12px;
  color: #999;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.product-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.product-image {
  width: 100%;
  height: 150px;
  background-color: #f5f5f5;
}

.product-info {
  padding: 10px;
}

.product-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  display: block;
}

.product-price {
  font-size: 16px;
  color: #ff6b6b;
  font-weight: bold;
}
</style>
