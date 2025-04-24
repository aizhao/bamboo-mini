import { ref, onMounted } from "vue";
import { getModel3DList } from "@/api/model3d";

export default {
  setup() {
    const modelList = ref([]);
    const loading = ref(false);
    const currentPage = ref(1);
    const pageSize = ref(10);
    const hasMore = ref(true);

    // 获取模型列表
    const fetchModelList = async (isLoadMore = false) => {
      if (loading.value || (!isLoadMore && !hasMore.value)) return;

      loading.value = true;
      try {
        const response = await getModel3DList({
          page: currentPage.value,
          pageSize: pageSize.value,
        });

        if (response.code === 0) {
          modelList.value = response.data.list;
        }
      } catch (error) {
        console.error("获取模型列表失败:", error);
        uni.showToast({
          title: "获取模型列表失败",
          icon: "none",
        });
      } finally {
        loading.value = false;
      }
    };

    // 加载更多
    const loadMore = () => {
      if (hasMore.value && !loading.value) {
        currentPage.value++;
        fetchModelList(true);
      }
    };

    // 下拉刷新
    const onPullDownRefresh = async () => {
      currentPage.value = 1;
      hasMore.value = true;
      await fetchModelList();
      uni.stopPullDownRefresh();
    };

    // 跳转到详情页
    const goToDetail = id => {
      uni.navigateTo({
        url: `/pages/shop/detail?id=${id}`,
      });
    };

    onMounted(() => {
      console.log("onMounted");
      fetchModelList();
    });

    return {
      modelList,
      loading,
      hasMore,
      loadMore,
      onPullDownRefresh,
      goToDetail,
    };
  },
};
