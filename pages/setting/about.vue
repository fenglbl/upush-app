<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.aboutUpushPageTitle')" :theme="theme"></app-navbar>
      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.aboutUpushPageDesc') }}</view>
      </view>
      <view class="placeholder-card theme-card">
        <view class="placeholder-title">UPUSH</view>
        <view class="placeholder-desc">{{ tr('setting.aboutUpushPageDesc') }}</view>
        <view class="placeholder-meta">Version 1.0.0</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() { return { theme: 'light', locale: 'zh' } },
  onLoad() { this.syncState() },
  onShow() { this.syncState() },
  computed: { themeClass() { return this.theme === 'dark' ? 'theme-dark' : 'theme-light' } },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) { return this.$t(path, this.locale) },
    applyNavTheme() {
      const isDark = this.theme === 'dark'
      uni.setNavigationBarColor({ frontColor: isDark ? '#ffffff' : '#000000', backgroundColor: isDark ? '#0f1d2c' : '#f5f9ff' })
    }
  }
}
</script>

<style lang="scss">
.setting-shell { min-height: 100vh; padding: 36rpx 28rpx 48rpx; }
.toolbar { margin-bottom: 24rpx; }
.toolbar-subtitle { margin-top: 8rpx; color: var(--text-secondary); }
.placeholder-card { padding: 48rpx 36rpx; border-radius: 28rpx; text-align: center; }
.placeholder-title { font-size: 42rpx; font-weight: 700; color: var(--text-primary); }
.placeholder-desc { margin-top: 18rpx; color: var(--text-secondary); }
.placeholder-meta { margin-top: 24rpx; color: var(--text-muted); }
</style>
