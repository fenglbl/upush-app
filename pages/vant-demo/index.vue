<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="demo-shell">
      <view class="toolbar-title">Vant Demo</view>
      <view class="toolbar-subtitle">用于验证 H5 端 Vant 是否已经初始化成功</view>

      <!-- #ifdef H5 -->
      <view class="demo-card theme-card">
        <van-cell-group inset>
          <van-cell title="Vant Button" value="已加载" />
          <van-cell title="Vant Switch" :value="checked ? '开' : '关'">
            <template #right-icon>
              <van-switch v-model="checked" size="22px" />
            </template>
          </van-cell>
        </van-cell-group>

        <view class="button-row">
          <van-button type="primary" block @click="showToast">点击测试</van-button>
        </view>
      </view>
      <!-- #endif -->

      <!-- #ifndef H5 -->
      <view class="demo-card theme-card">
        <view class="native-tip">当前演示页主要用于 H5 验证，App / 小程序端不会启用 Vant Web 组件。</view>
      </view>
      <!-- #endif -->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light',
      checked: true
    }
  },
  onLoad() {
    this.theme = uni.getStorageSync('appTheme') || 'light'
    this.applyNavTheme()
  },
  onShow() {
    this.theme = uni.getStorageSync('appTheme') || 'light'
    this.applyNavTheme()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
    }
  },
  methods: {
    applyNavTheme() {
      const isDark = this.theme === 'dark'
      uni.setNavigationBarColor({
        frontColor: isDark ? '#ffffff' : '#000000',
        backgroundColor: isDark ? '#0f1d2c' : '#f5f9ff'
      })
    },
    showToast() {
      this.$toast('Vant 已初始化')
    }
  }
}
</script>

<style lang="scss">
.demo-shell {
  min-height: 100vh;
  padding: 36rpx 28rpx 48rpx;
}

.toolbar-title {
  font-size: 48rpx;
  line-height: 56rpx;
  font-weight: 600;
  color: var(--text-primary);
}

.toolbar-subtitle {
  margin-top: 10rpx;
  color: var(--text-secondary);
}

.demo-card {
  margin-top: 28rpx;
  padding: 28rpx;
  border-radius: 28rpx;
}

.button-row {
  margin-top: 24rpx;
}

.native-tip {
  color: var(--text-secondary);
  line-height: 40rpx;
}
</style>
