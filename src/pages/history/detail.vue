<template>
  <view class="article-detail">
    <!-- 文章头部 -->
    <view class="article-header">
      <text class="title">{{ article[0]?.title }}</text>
      <view class="meta">
        <view class="author">
          <text class="name">{{ article[0]?.author }}</text>
        </view>
        <view class="info">
          <text class="time">{{ article[0]?.create_time }}</text>
          <text class="views">{{ article[0]?.review_comment }} 阅读</text>
        </view>
      </view>
    </view>

    <!-- 文章内容 -->
    <view class="article-content">
      <rich-text :nodes="article[0]?.content"></rich-text>
    </view>

    <!-- 文章图片 -->
    <view class="article-images" v-if="article[0]?.cover_image">
      <image :src="article[0]?.cover_image" mode="widthFix" class="content-image" @click="previewImage(index)"></image>
    </view>

    <!-- 文章底部 -->
    <view class="article-footer">
      <view class="tags" v-if="tagsList">
        <text class="tag" v-for="(tag, index) in tagsList" :key="index">#{{ tag }}</text>
      </view>
      <view class="actions">
        <view class="action-item" @click="handleLike">
          <text class="action-icon">{{ isLiked ? "❤️" : "🤍" }}</text>
          <text class="action-count">{{ likes }}</text>
        </view>
        <view class="action-item" @click="handleCollect">
          <text class="action-icon">{{ isCollected ? "⭐" : "☆" }}</text>
          <text class="action-count">{{ collects }}</text>
        </view>
        <view class="action-item" @click="handleShare">
          <text class="action-icon">↗️</text>
          <text class="action-text">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { getHistory } from "@/api/history";
const article = ref([]);
const likes = ref(154);
const collects = ref(56);
const isLiked = ref(false);
const isCollected = ref(false);
const tagsList = ref([]);
const getArticleDetail = async id => {
  try {
    // 这里替换为实际的API调用
    const res = await getHistory();
    if (res.data) {
      article.value = res.data.list.filter(item => item.id == id);
      tagsList.value = article.value[0].tags.split(",");
    }
  } catch (error) {
    console.error("获取文章详情失败:", error);
    uni.showToast({
      title: "获取文章详情失败",
      icon: "none",
    });
  }
};

const previewImage = index => {
  uni.previewImage({
    urls: article.value.cover_images,
    current: index,
  });
};

const handleLike = () => {
  isLiked.value = !isLiked.value;
  likes.value += isLiked.value ? 1 : -1;
  // 这里添加点赞API调用
};

const handleCollect = () => {
  isCollected.value = !isCollected.value;
  collects.value += isCollected.value ? 1 : -1;
  // 这里添加收藏API调用
};

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true,
    menus: ["shareAppMessage", "shareTimeline"],
  });
};
onLoad(options => {
  const id = options.id;
  if (id) {
    getArticleDetail(id);
  }
});
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
});
</script>

<style scoped>
.article-detail {
  min-height: 100vh;
  background-color: #fff;
  padding-bottom: env(safe-area-inset-bottom);
}

.article-header {
  padding: 40rpx 30rpx;
  border-bottom: 1rpx solid #f5f5f5;
}

.title {
  font-size: 40rpx;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
  margin-bottom: 30rpx;
  display: block;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 30rpx;
  margin-right: 16rpx;
}

.name {
  font-size: 28rpx;
  color: #666;
}

.info {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.time,
.views {
  font-size: 24rpx;
  color: #999;
}

.article-content {
  padding: 30rpx;
  font-size: 30rpx;
  color: #333;
  line-height: 1.8;
}

.article-images {
  padding: 0 30rpx;
}

.content-image {
  width: 100%;
  margin-bottom: 20rpx;
  border-radius: 12rpx;
}

.article-footer {
  padding: 30rpx;
  border-top: 1rpx solid #f5f5f5;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-bottom: 30rpx;
}

.tag {
  font-size: 24rpx;
  color: #5a8d69;
  background-color: rgba(90, 141, 105, 0.1);
  padding: 8rpx 20rpx;
  border-radius: 20rpx;
}

.actions {
  display: flex;
  justify-content: space-around;
  padding-top: 20rpx;
  border-top: 1rpx solid #f5f5f5;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.action-icon {
  font-size: 36rpx;
}

.action-count,
.action-text {
  font-size: 26rpx;
  color: #666;
}
</style>
