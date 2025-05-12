<template>
  <view class="page-container">
    <!-- 3D模型容器 -->
    <view class="model-container">
      <canvas class="webgl" type="webgl" id="gl" @touchstart="onTX" @touchmove="onTX" @touchend="onTX"></canvas>

      <!-- 加载进度 -->
      <view class="loading-overlay" v-if="loading">
        <view class="loading-content">
          <view class="loading-spinner"></view>
          <text class="loading-text">模型加载中 {{ loadingProgress }}%</text>
        </view>
      </view>
    </view>

    <!-- 底部操作按钮 -->
    <view class="bottom-ops">
      <view class="op-row">
        <view class="op-btn" @click="zoomIn">
          <text>放大</text>
        </view>
        <view class="op-btn" @click="zoomOut">
          <text>缩小</text>
        </view>
      </view>
      <view class="op-row">
        <view class="op-btn" @click="rotateLeft">
          <text>左转</text>
        </view>
        <view class="op-btn" @click="rotateRight">
          <text>右转</text>
        </view>
      </view>
      <view class="op-row">
        <view class="op-btn" @click="rotateUp">
          <text>上转</text>
        </view>
        <view class="op-btn" @click="rotateDown">
          <text>下转</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from "@dcloudio/uni-app";
import { ref, onMounted, onUnmounted } from "vue";
import { $cancelAnimationFrame, $requestAnimationFrame, $window, AmbientLight, DirectionalLight, PerspectiveCamera, PLATFORM, Scene, sRGBEncoding, WebGL1Renderer } from "three-platformize";
import * as THREE from "three-platformize";
import { WechatPlatform } from "three-platformize/src/WechatPlatform";
import { GLTFLoader } from "three-platformize/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three-platformize/examples/jsm/controls/OrbitControls";
import { getModel3DById } from "@/api/model3d";
const modelUrl = ref("");
const id = ref("");
// 状态管理
const loading = ref(true);
const loadingProgress = ref(0);
const autoRotate = ref(false);
let frameId = null;
let disposing = false;

// Three.js 相关变量
let canvas = null;
let platform = null;
let scene = null;
let camera = null;
let renderer = null;
let controls = null;
let model = null;

// 初始化场景
const initScene = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5f5f5);

  // 添加环境光和方向光
  const ambientLight = new AmbientLight(0xffffff, 0.6);
  const directionalLight = new DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(ambientLight, directionalLight);
};

// 初始化相机
const initCamera = () => {
  const aspect = canvas.width / canvas.height;
  camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
  // 调整相机初始位置
  camera.position.set(0, 1, 3);
};

// 初始化渲染器
const initRenderer = () => {
  renderer = new WebGL1Renderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.outputEncoding = sRGBEncoding;
  renderer.setSize(canvas.width, canvas.height);
  renderer.setPixelRatio($window.devicePixelRatio);
  // 设置渲染器的透明度
  renderer.setClearColor(0x000000, 0);
};

// 初始化控制器
const initControls = () => {
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 2.0;
  // 设置缩放限制
  controls.minDistance = 1;
  controls.maxDistance = 4;
  // 反转Y轴旋转方向
  controls.reverseOrbit = true;
  // 启用旋转
  controls.enableRotate = true;
  // 设置旋转速度
  controls.rotateSpeed = 1.0;
  // 设置缩放速度
  controls.zoomSpeed = 1.0;
};

// 操作按钮方法
const zoomIn = () => {
  if (controls) {
    const scale = 1.1;
    camera.position.multiplyScalar(1 / scale);
    controls.update();
  }
};

const zoomOut = () => {
  if (controls) {
    const scale = 1.1;
    camera.position.multiplyScalar(scale);
    controls.update();
  }
};

const rotateLeft = () => {
  if (controls) {
    // 使用基础的相机旋转方法
    const angle = Math.PI / 12;
    const radius = camera.position.distanceTo(controls.target);
    const x = camera.position.x * Math.cos(angle) - camera.position.z * Math.sin(angle);
    const z = camera.position.x * Math.sin(angle) + camera.position.z * Math.cos(angle);
    camera.position.set(x, camera.position.y, z);
    camera.lookAt(controls.target);
    controls.update();
  }
};

const rotateRight = () => {
  if (controls) {
    // 使用基础的相机旋转方法
    const angle = -Math.PI / 12;
    const radius = camera.position.distanceTo(controls.target);
    const x = camera.position.x * Math.cos(angle) - camera.position.z * Math.sin(angle);
    const z = camera.position.x * Math.sin(angle) + camera.position.z * Math.cos(angle);
    camera.position.set(x, camera.position.y, z);
    camera.lookAt(controls.target);
    controls.update();
  }
};

const rotateUp = () => {
  if (controls) {
    // 使用基础的相机旋转方法
    const angle = Math.PI / 12;
    const radius = camera.position.distanceTo(controls.target);
    const y = camera.position.y * Math.cos(angle) - camera.position.z * Math.sin(angle);
    const z = camera.position.y * Math.sin(angle) + camera.position.z * Math.cos(angle);
    camera.position.set(camera.position.x, y, z);
    camera.lookAt(controls.target);
    controls.update();
  }
};

const rotateDown = () => {
  if (controls) {
    // 使用基础的相机旋转方法
    const angle = -Math.PI / 12;
    const radius = camera.position.distanceTo(controls.target);
    const y = camera.position.y * Math.cos(angle) - camera.position.z * Math.sin(angle);
    const z = camera.position.y * Math.sin(angle) + camera.position.z * Math.cos(angle);
    camera.position.set(camera.position.x, y, z);
    camera.lookAt(controls.target);
    controls.update();
  }
};

// 加载模型并自适应相机
const loadModel = async () => {
  const loader = new GLTFLoader();
  try {
    const gltf = await loader.loadAsync(modelUrl.value, progress => {
      loadingProgress.value = Math.floor((progress.loaded / progress.total) * 100);
    });
    model = gltf.scene;
    // 先重置缩放
    model.scale.set(1, 1, 1);
    model.position.set(0, 0, 0);
    scene.add(model);

    // 自动适配相机和模型缩放
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // 让模型居中并稍微向下偏移
    model.position.x -= center.x;
    model.position.y -= center.y + 0.1; // 向下偏移0.2个单位
    model.position.z -= center.z;
    // 计算最大尺寸
    const maxDim = Math.max(size.x, size.y, size.z);
    // 让模型最大化但不贴边
    const scale = 0.7 / maxDim; // 减小模型尺寸
    model.scale.set(scale, scale, scale);
    // 重新计算包围盒
    const newBox = new THREE.Box3().setFromObject(model);
    const newSize = newBox.getSize(new THREE.Vector3());
    // 设置相机距离
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = newSize.y / 2 / Math.tan(fov / 2) + 0.5;
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0.1, 0); // 相机看向模型的新位置
    controls.target.set(0, 0.1, 0); // 控制器目标点也相应调整
    controls.update();
    loading.value = false;
  } catch (error) {
    console.error("模型加载失败:", error);
    uni.showToast({
      title: "模型加载失败",
      icon: "none",
    });
  }
};

// 渲染循环
const render = () => {
  if (!disposing) {
    frameId = $requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
};

// 重置相机
const resetCamera = () => {
  if (model) {
    camera.position.set(0, 0, camera.position.z);
    camera.lookAt(0, 0, 0);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.reset();
  }
};

// 切换自动旋转
const toggleAutoRotate = () => {
  autoRotate.value = !autoRotate.value;
  controls.autoRotate = autoRotate.value;
};

// 触摸事件处理
const onTX = e => {
  platform.dispatchTouchEvent(e);
};
const init = async () => {
  const res = await getModel3DById(id.value);
  modelUrl.value = res.data.model_url;
  console.log(modelUrl.value);
};
onLoad(options => {
  id.value = options.id;
  init();
});
// 初始化
onMounted(() => {
  uni
    .createSelectorQuery()
    .select("#gl")
    .node()
    .exec(res => {
      canvas = res[0].node;
      platform = new WechatPlatform(canvas);
      PLATFORM.set(platform);

      initScene();
      initCamera();
      initRenderer();
      initControls();
      loadModel();
      render();
    });
});

// 清理
onUnmounted(() => {
  disposing = true;
  if (frameId) {
    $cancelAnimationFrame(frameId);
  }
  PLATFORM.dispose();
});
</script>

<style lang="scss" scoped>
.page-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.model-container {
  flex: 1;
  position: relative;
  width: 100%;
  height: calc(100% - 160px); // 增加底部按钮区域的高度
}

.webgl {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.loading-content {
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #5a8d69;
  border-radius: 50%;
  margin: 0 auto 10px;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 14px;
  color: #666;
}

.bottom-ops {
  height: 160px; // 增加高度以适应三行按钮
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.op-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.op-btn {
  min-width: 80px;
  height: 36px;
  background: #f5f5f5;
  border-radius: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  padding: 0 16px;

  &:active {
    background: #e8e8e8;
    transform: scale(0.95);
  }

  text {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
