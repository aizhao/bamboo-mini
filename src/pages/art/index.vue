<template>
  <view class="container">
    <!-- 发布动态按钮 -->
    <view class="post-btn" @click="handlePost">
      <text class="post-icon">+</text>
      <text class="post-text">发布动态</text>
    </view>

    <!-- 动态列表 -->
    <view class="moment-list">
      <view class="moment-item" v-for="(item, index) in moments" :key="index">
        <!-- 用户信息 -->
        <view class="user-info">
          <image class="avatar" :src="item.user.avatar" mode="aspectFill"></image>
          <view class="user-details">
            <text class="nickname">{{ item.user.nickname }}</text>
            <text class="time">{{ item.time }}</text>
          </view>
        </view>

        <!-- 动态内容 -->
        <view class="moment-content">
          <text class="text">{{ item.content }}</text>
          <!-- 图片/视频网格 -->
          <view class="media-grid" v-if="item.media.length > 0">
            <view class="media-item" v-for="(media, mediaIndex) in item.media" :key="mediaIndex" @click="previewMedia(media, item.media)">
              <image v-if="media.type === 'image'" :src="media.url" mode="aspectFill" class="media-image"></image>
              <video v-else-if="media.type === 'video'" :src="media.url" class="media-video" :poster="media.cover"></video>
            </view>
          </view>
        </view>

        <!-- 互动区域 -->
        <view class="interaction">
          <view class="location" v-if="item.location">
            <text class="location-icon">📍</text>
            <text class="location-text">{{ item.location }}</text>
          </view>
          <view class="actions">
            <view class="action-item" @click="handleLike(item)">
              <text class="action-icon">{{ item.isLiked ? "❤️" : "🤍" }}</text>
              <text class="action-count">{{ item.likes }}</text>
            </view>
            <view class="action-item" @click="handleComment(item)">
              <text class="action-icon">💬</text>
              <text class="action-count">{{ item.comments.length }}</text>
            </view>
            <view class="action-item" @click="handleShare(item)">
              <text class="action-icon">↗️</text>
            </view>
          </view>
        </view>

        <!-- 评论区 -->
        <view class="comment-section" v-if="item.comments.length > 0">
          <view class="comment-item" v-for="(comment, commentIndex) in item.comments" :key="commentIndex">
            <text class="comment-user">{{ comment.user }}：</text>
            <text class="comment-content">{{ comment.content }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 发布动态弹窗 -->
    <uni-popup ref="postPopup" type="bottom">
      <view class="post-popup">
        <view class="popup-header">
          <text class="cancel" @click="closePostPopup">取消</text>
          <text class="title">发布动态</text>
          <text class="submit" @click="submitPost">发布</text>
        </view>
        <view class="popup-content">
          <textarea class="post-textarea" v-model="postContent" placeholder="分享你的竹艺心得..." maxlength="500"></textarea>
          <view class="media-upload">
            <view class="upload-item" v-for="(item, index) in postMedia" :key="index">
              <image v-if="item.type === 'image'" :src="item.url" mode="aspectFill"></image>
              <video v-else-if="item.type === 'video'" :src="item.url" :poster="item.cover"></video>
              <text class="delete-btn" @click="deleteMedia(index)">×</text>
            </view>
            <view class="upload-btn" @click="chooseMedia" v-if="postMedia.length < 9">
              <text class="upload-icon">+</text>
            </view>
          </view>
        </view>
      </view>
    </uni-popup>

    <!-- 评论弹窗 -->
    <uni-popup ref="commentPopup" type="bottom">
      <view class="comment-popup">
        <view class="popup-header">
          <text class="cancel" @click="closeCommentPopup">取消</text>
          <text class="title">发表评论</text>
          <text class="submit" @click="submitComment">发布</text>
        </view>
        <view class="popup-content">
          <textarea class="comment-textarea" v-model="commentContent" placeholder="请输入评论内容..." maxlength="500"></textarea>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { onShow } from "@dcloudio/uni-app";
import { ref, onMounted } from "vue";
import { getDynamic, addComment } from "../../api/dynamic/index";
import { getToken } from "@/utils/auth";

const moments = ref([]);
const postContent = ref("");
const postMedia = ref([]);
const postPopup = ref(null);
const commentPopup = ref(null);
const commentContent = ref("");
const currentDynamicId = ref(null);
onShow(() => {
  if (getToken) {
    fetchDynamicList();
  }
});
// 获取动态列表
const fetchDynamicList = async () => {
  try {
    const res = await getDynamic();
    if (res.data) {
      moments.value = res.data.list;
    }
  } catch (error) {
    console.error("获取动态列表失败:", error);
    uni.showToast({
      title: "获取动态列表失败",
      icon: "none",
    });
  }
};

const handlePost = () => {
  postPopup.value.open();
};

const closePostPopup = () => {
  postPopup.value.close();
  postContent.value = "";
  postMedia.value = [];
};

const chooseMedia = async () => {
  try {
    const res = await uni.chooseMedia({
      count: 9 - postMedia.value.length,
      mediaType: ["image", "video"],
      sourceType: ["album", "camera"],
      camera: "back",
    });

    res.tempFiles.forEach(file => {
      postMedia.value.push({
        type: file.fileType.includes("image") ? "image" : "video",
        url: file.tempFilePath,
        cover: file.thumbTempFilePath,
      });
    });
  } catch (error) {
    console.error("选择媒体失败:", error);
  }
};

const deleteMedia = index => {
  postMedia.value.splice(index, 1);
};

const submitPost = () => {
  if (!postContent.value && postMedia.value.length === 0) {
    uni.showToast({
      title: "请输入内容或上传媒体",
      icon: "none",
    });
    return;
  }

  const newMoment = {
    user: {
      avatar: "/static/images/avatar-default.png",
      nickname: "我",
    },
    time: "刚刚",
    content: postContent.value,
    media: [...postMedia.value],
    location: "江安竹簧工艺馆",
    likes: 0,
    isLiked: false,
    comments: [],
  };

  moments.value.unshift(newMoment);
  closePostPopup();

  uni.showToast({
    title: "发布成功",
    icon: "success",
  });
};

const previewMedia = (media, mediaList) => {
  if (media.type === "image") {
    uni.previewImage({
      urls: mediaList.filter(m => m.type === "image").map(m => m.url),
      current: media.url,
    });
  } else if (media.type === "video") {
    uni.navigateTo({
      url: `/pages/common/video-player?url=${encodeURIComponent(media.url)}`,
    });
  }
};

const handleLike = item => {
  item.isLiked = !item.isLiked;
  item.likes += item.isLiked ? 1 : -1;
};

const handleComment = item => {
  currentDynamicId.value = item.id;
  commentContent.value = "";
  commentPopup.value.open();
};

const closeCommentPopup = () => {
  commentPopup.value.close();
  commentContent.value = "";
  currentDynamicId.value = null;
};

const submitComment = async () => {
  if (!commentContent.value.trim()) {
    uni.showToast({
      title: "请输入评论内容",
      icon: "none",
    });
    return;
  }

  try {
    const res = await addComment(currentDynamicId.value, {
      content: commentContent.value,
    });

    if (res.data) {
      // 更新评论列表
      const dynamic = moments.value.find(item => item.id === currentDynamicId.value);
      if (dynamic) {
        dynamic.comments.push(res.data);
      }

      uni.showToast({
        title: "评论成功",
        icon: "success",
      });
      closeCommentPopup();
    }
  } catch (error) {
    console.error("发表评论失败:", error);
    uni.showToast({
      title: "发表评论失败",
      icon: "none",
    });
  }
};

const handleShare = item => {
  uni.showToast({
    title: "分享功能开发中",
    icon: "none",
  });
};

onMounted(() => {
  fetchDynamicList();
});
</script>

<style scoped>
.container {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 30rpx;
}

.post-btn {
  position: fixed;
  right: 30rpx;
  bottom: 100rpx;
  width: 120rpx;
  height: 120rpx;
  background: linear-gradient(135deg, #91a967, #5a8d69);
  border-radius: 60rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.post-icon {
  font-size: 40rpx;
  margin-bottom: 4rpx;
}

.post-text {
  font-size: 24rpx;
}

.moment-list {
  padding: 20rpx;
}

.moment-item {
  background-color: #fff;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
  padding: 30rpx;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.avatar {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
  margin-right: 20rpx;
}

.user-details {
  flex: 1;
}

.nickname {
  font-size: 28rpx;
  font-weight: 500;
  color: #333;
  margin-bottom: 4rpx;
  display: block;
}

.time {
  font-size: 24rpx;
  color: #999;
}

.moment-content {
  margin-bottom: 20rpx;
}

.text {
  font-size: 28rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20rpx;
  display: block;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10rpx;
}

.media-item {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  overflow: hidden;
}

.media-image,
.media-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.interaction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.location {
  display: flex;
  align-items: center;
}

.location-icon {
  font-size: 24rpx;
  margin-right: 4rpx;
}

.location-text {
  font-size: 24rpx;
  color: #666;
}

.actions {
  display: flex;
  gap: 30rpx;
}

.action-item {
  display: flex;
  align-items: center;
}

.action-icon {
  font-size: 32rpx;
  margin-right: 8rpx;
}

.action-count {
  font-size: 24rpx;
  color: #666;
}

.comment-section {
  background-color: #f8f9fa;
  border-radius: 10rpx;
  padding: 20rpx;
}

.comment-item {
  font-size: 26rpx;
  color: #333;
  line-height: 1.6;
  margin-bottom: 10rpx;
}

.comment-item:last-child {
  margin-bottom: 0;
}

.comment-user {
  color: #5a8d69;
  font-weight: 500;
}

.post-popup {
  background-color: #fff;
  border-radius: 30rpx 30rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.cancel,
.submit {
  font-size: 28rpx;
  color: #666;
}

.title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.submit {
  color: #5a8d69;
}

.popup-content {
  padding: 30rpx;
}

.post-textarea {
  width: 100%;
  height: 200rpx;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 30rpx;
}

.media-upload {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}

.upload-item {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  overflow: hidden;
}

.upload-item image,
.upload-item video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.delete-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 40rpx;
  height: 40rpx;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 0 10rpx;
}

.upload-btn {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-icon {
  font-size: 60rpx;
  color: #999;
}

.comment-popup {
  background-color: #fff;
  border-radius: 30rpx 30rpx 0 0;
  padding-bottom: env(safe-area-inset-bottom);
}

.comment-popup .popup-header {
  padding: 30rpx;
  border-bottom: 1rpx solid #eee;
}

.comment-popup .cancel,
.comment-popup .submit {
  font-size: 28rpx;
  color: #666;
}

.comment-popup .title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.comment-popup .submit {
  color: #5a8d69;
}

.comment-popup .popup-content {
  padding: 30rpx;
}

.comment-popup .comment-textarea {
  width: 100%;
  height: 200rpx;
  font-size: 28rpx;
  color: #333;
  margin-bottom: 30rpx;
}
</style>
