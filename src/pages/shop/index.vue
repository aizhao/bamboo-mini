<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search-bar">
      <input type="text" v-model="searchKeyword" placeholder="搜索3D模型" class="search-input" @confirm="handleSearch" />
    </view>

    <!-- 模型列表 -->
    <scroll-view scroll-y class="model-list" @scrolltolower="loadMore" refresher-enabled :refresher-triggered="loading" @refresherrefresh="onPullDownRefresh">
      <view class="model-grid">
        <view class="model-item" v-for="model in modelList" :key="model.id" @click="goToDetail(model.id)">
          <image :src="model.thumbnail_url" mode="aspectFit" class="model-image" />
          <view class="model-info">
            <text class="model-name">{{ model.name }}</text>
            <text class="model-author">{{ model.author }}</text>
            <view class="model-meta">
              <text class="model-format">{{ model.format }}</text>
              <text class="model-size">{{ formatSize(model.size) }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-status">
        <text v-if="loading">加载中...</text>
        <text v-else-if="!hasMore">没有更多了</text>
        <text v-else-if="error">{{ error }}</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getModel3DList } from "@/api/model3d";
import { getToken } from "@/utils/auth";

// console.log("shop/index.vue 脚本开始执行");

const searchKeyword = ref("");
const modelList = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const pageSize = ref(10);
const hasMore = ref(true);
const error = ref("");

// 检查登录状态
onMounted(() => {
  // console.log("shop/index.vue - 页面加载完成");
  // const token = getToken();
  // console.log("shop/index.vue - 检查token:", token ? "已存在" : "不存在");

  // if (!token) {
  //   console.log("shop/index.vue - 未登录，跳转到登录页");
  //   uni.navigateTo({
  //     url: "/pages/login/index",
  //   });
  //   return;
  // }

  // 获取模型列表
  fetchModelList();
});

// 格式化文件大小
const formatSize = size => {
  if (!size) return "0B";
  if (size < 1024) {
    return size + "B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + "KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + "MB";
  }
};

// 搜索处理
const handleSearch = () => {
  console.log("执行搜索，关键词：", searchKeyword.value);
  currentPage.value = 1;
  hasMore.value = true;
  modelList.value = [];
  fetchModelList();
};

// 获取模型列表
const fetchModelList = async (isLoadMore = false) => {
  console.log("开始获取模型列表，isLoadMore:", isLoadMore);
  if (loading.value || (!isLoadMore && !hasMore.value)) {
    console.log("跳过获取，loading:", loading.value, "hasMore:", hasMore.value);
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    console.log("发送请求，参数：", {
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value,
    });
    const response = await getModel3DList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value,
    });

    console.log("获取模型列表响应：", response);

    if (response.code === 0) {
      const newList = response.data.list || [];
      console.log("获取到新数据：", newList);
      if (isLoadMore) {
        modelList.value = [...modelList.value, ...newList];
      } else {
        modelList.value = newList;
      }
      hasMore.value = newList.length === pageSize.value;
      currentPage.value++;
    } else {
      error.value = response.message || "获取模型列表失败";
      console.error("获取模型列表失败:", response.message);
    }
  } catch (error) {
    console.error("获取模型列表异常:", error);
    error.value = "网络请求失败，请稍后重试";
  } finally {
    loading.value = false;
  }
};

// 加载更多
const loadMore = () => {
  console.log("触发加载更多");
  if (hasMore.value && !loading.value) {
    fetchModelList(true);
  }
};

// 下拉刷新
const onPullDownRefresh = () => {
  console.log("触发下拉刷新");
  currentPage.value = 1;
  hasMore.value = true;
  modelList.value = [];
  fetchModelList().finally(() => {
    uni.stopPullDownRefresh();
  });
};

// 跳转到详情页
const goToDetail = id => {
  console.log("跳转到详情页，ID:", id);
  uni.navigateTo({
    url: `/pages/shop/detail?id=${id}`,
  });
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.search-bar {
  padding: 10px;
  background-color: #fff;
}

.search-input {
  height: 36px;
  background-color: #f0f0f0;
  border-radius: 18px;
  padding: 0 15px;
  font-size: 14px;
}

.model-list {
  flex: 1;
  padding: 10px;
}

.model-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.model-item {
  width: 48%;
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.model-image {
  width: 100%;
  height: 120px;
  background-color: #eee;
}

.model-info {
  padding: 10px;
}

.model-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.model-author {
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  display: block;
}

.model-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.model-format,
.model-size {
  font-size: 12px;
  color: #999;
}

.loading-status {
  text-align: center;
  padding: 10px;
  color: #999;
  font-size: 14px;
}
</style>
