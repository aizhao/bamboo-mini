<template>
  <view class="container">
    <scroll-view class="category-scroll" scroll-x>
      <view class="category-list">
        <view class="category-item" v-for="(item, index) in categories" :key="index" :class="{ active: currentCategory === index }" @click="selectCategory(index)">
          {{ item }}
        </view>
      </view>
    </scroll-view>

    <view class="art-grid">
      <view class="art-item" v-for="(item, index) in artworks" :key="index">
        <image class="art-image" :src="item.image" mode="aspectFill"></image>
        <view class="art-info">
          <text class="art-title">{{ item.title }}</text>
          <view class="art-meta">
            <view class="artist">
              <image class="artist-avatar" :src="item.artist.avatar"></image>
              <text class="artist-name">{{ item.artist.name }}</text>
            </view>
            <view class="likes">
              <text class="like-count">{{ item.likes }}</text>
              <text class="like-text">赞</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";

const categories = ref(["推荐", "作品展示", "技艺交流", "大师课堂"]);
const currentCategory = ref(0);

const artworks = ref([
  {
    image: "/static/images/art/artwork1.jpg",
    title: "传统竹簧编织艺术",
    artist: {
      name: "张大师",
      avatar: "/static/images/avatars/artist1.jpg",
    },
    likes: 328,
  },
  {
    image: "/static/images/art/artwork2.jpg",
    title: "现代竹簧创新设计",
    artist: {
      name: "李匠人",
      avatar: "/static/images/avatars/artist2.jpg",
    },
    likes: 256,
  },
  {
    image: "/static/images/art/artwork3.jpg",
    title: "竹簧器具制作技艺",
    artist: {
      name: "王传承",
      avatar: "/static/images/avatars/artist3.jpg",
    },
    likes: 189,
  },
]);

const selectCategory = index => {
  currentCategory.value = index;
};
</script>

<style scoped>
.container {
  background-color: #fff;
  min-height: 100vh;
}

.category-scroll {
  background-color: #fff;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.category-list {
  display: flex;
  padding: 0 15px;
  white-space: nowrap;
}

.category-item {
  padding: 8px 20px;
  margin-right: 10px;
  border-radius: 20px;
  font-size: 14px;
  color: #666;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
}

.category-item.active {
  background-color: #5a8d69;
  color: #fff;
}

.art-grid {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.art-item {
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.art-image {
  width: 100%;
  height: 150px;
  background-color: #f5f5f5;
}

.art-info {
  padding: 10px;
}

.art-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.art-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.artist {
  display: flex;
  align-items: center;
}

.artist-avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.artist-name {
  font-size: 12px;
  color: #666;
}

.likes {
  display: flex;
  align-items: center;
}

.like-count {
  font-size: 12px;
  color: #5a8d69;
  margin-right: 2px;
}

.like-text {
  font-size: 12px;
  color: #999;
}
</style>
