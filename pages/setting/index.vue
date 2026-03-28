<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <view class="toolbar">
        <view>
          <view class="toolbar-title">{{ tr('setting.title') }}</view>
          <view class="toolbar-subtitle">{{ tr('setting.subtitle') }}</view>
        </view>
      </view>

      <view class="setting-card theme-card">
        <view class="setting-head">
          <view class="setting-title">{{ tr('setting.themeTitle') }}</view>
          <view class="setting-desc">{{ tr('setting.themeDesc') }}</view>
        </view>
        <view class="option-group">
          <button class="option-button" :class="{ active: theme === 'light' }" @click="setTheme('light')">{{ tr('setting.light') }}</button>
          <button class="option-button" :class="{ active: theme === 'dark' }" @click="setTheme('dark')">{{ tr('setting.dark') }}</button>
        </view>
      </view>

      <view class="setting-card theme-card">
        <view class="setting-head">
          <view class="setting-title">{{ tr('setting.languageTitle') }}</view>
          <view class="setting-desc">{{ tr('setting.languageDesc') }}</view>
        </view>
        <view class="option-group">
          <button class="option-button" :class="{ active: locale === 'zh' }" @click="setAppLocale('zh')">{{ tr('setting.chinese') }}</button>
          <button class="option-button" :class="{ active: locale === 'en' }" @click="setAppLocale('en')">{{ tr('setting.english') }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        theme: 'light',
        locale: 'zh'
      }
    },
    onLoad() {
      this.syncState()
    },
    onShow() {
      this.syncState()
    },
    computed: {
      themeClass() {
        return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
      }
    },
    methods: {
      syncState() {
        this.theme = uni.getStorageSync('appTheme') || 'light'
        this.locale = this.$getLocale()
        this.$applyTabBarI18n(this.locale)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
      },
      tr(path) {
        return this.$t(path, this.locale)
      },
      setTheme(theme) {
        this.theme = theme
        uni.setStorageSync('appTheme', theme)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
      },
      setAppLocale(locale) {
        this.locale = this.$setLocale(locale)
        this.$applyTabBarI18n(this.locale)
      },
      applyNavTheme() {
        const isDark = this.theme === 'dark'
        uni.setNavigationBarColor({
          frontColor: isDark ? '#ffffff' : '#000000',
          backgroundColor: isDark ? '#0f1d2c' : '#f5f9ff'
        })
      }
    }
  }
</script>

<style lang="scss">
.setting-shell {
  min-height: 100vh;
  padding: 36rpx 28rpx 48rpx;
}

.toolbar {
  margin-bottom: 28rpx;
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

.setting-card {
  border-radius: 28rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
}

.setting-head {
  margin-bottom: 24rpx;
}

.setting-title {
  font-size: 32rpx;
  font-weight: 600;
  color: var(--text-primary);
}

.setting-desc {
  margin-top: 10rpx;
  color: var(--text-secondary);
}

.option-group {
  display: flex;
  gap: 20rpx;
}

.option-button {
  flex: 1;
  height: 88rpx;
  line-height: 88rpx;
  border-radius: 24rpx;
  background: var(--surface-strong);
  color: var(--text-primary);
  border: 1rpx solid var(--border-color);

  &.active {
    background: linear-gradient(135deg, var(--accent-color) 0%, #3fb2ff 100%);
    color: var(--button-text);
    border-color: transparent;
  }
}
</style>
