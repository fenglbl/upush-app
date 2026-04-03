<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.aboutUpushPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.aboutUpushPageDesc') }}</view>
      </view>

      <view class="hero-card theme-card">
        <view class="hero-badge">{{ tr('setting.aboutHeroBadge') }}</view>
        <view class="hero-title">UPUSH</view>
        <view class="hero-desc">{{ tr('setting.aboutHeroDesc') }}</view>

        <view class="version-chip">
          <text class="version-label">{{ tr('setting.aboutVersionLabel') }}</text>
          <text class="version-value">{{ displayVersionName }}</text>
        </view>
      </view>

      <view class="section-block">
        <view class="section-title">{{ tr('setting.aboutHighlightsTitle') }}</view>

        <view class="highlight-list">
          <view class="highlight-card theme-card">
            <view class="highlight-icon">🔔</view>
            <view class="highlight-content">
              <view class="highlight-title">{{ tr('setting.aboutHighlightMessagesTitle') }}</view>
              <view class="highlight-desc">{{ tr('setting.aboutHighlightMessagesDesc') }}</view>
            </view>
          </view>

          <view class="highlight-card theme-card">
            <view class="highlight-icon">🛡️</view>
            <view class="highlight-content">
              <view class="highlight-title">{{ tr('setting.aboutHighlightAccountTitle') }}</view>
              <view class="highlight-desc">{{ tr('setting.aboutHighlightAccountDesc') }}</view>
            </view>
          </view>

          <view class="highlight-card theme-card">
            <view class="highlight-icon">✨</view>
            <view class="highlight-content">
              <view class="highlight-title">{{ tr('setting.aboutHighlightExperienceTitle') }}</view>
              <view class="highlight-desc">{{ tr('setting.aboutHighlightExperienceDesc') }}</view>
            </view>
          </view>
        </view>
      </view>

      <view class="footer-card theme-card">
        <view class="footer-title">{{ tr('setting.aboutFooterTitle') }}</view>
        <view class="footer-desc">{{ tr('setting.aboutFooterDesc') }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { resolveTheme } from '@/common/lib/theme.js'

export default {
  data() {
    return {
      theme: 'light',
      locale: 'zh',
      versionName: '1.0.0'
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
    },
    displayVersionName() {
      return this.versionName ? `V${this.versionName}` : 'V1.0.0'
    }
  },
  methods: {
    syncState() {
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.versionName = this.getRuntimeVersionName()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    getRuntimeVersionName() {
      // #ifdef APP-PLUS
      if (typeof plus !== 'undefined' && plus.runtime && plus.runtime.version) {
        return plus.runtime.version
      }
      // #endif

      // #ifdef MP-WEIXIN
      const accountInfo = uni.getAccountInfoSync && uni.getAccountInfoSync()
      const miniVersion = accountInfo?.miniProgram?.version
      if (miniVersion) {
        return miniVersion
      }
      // #endif

      return '1.0.0'
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
  padding: 36rpx 28rpx 56rpx;
}

.toolbar {
  margin-bottom: 24rpx;
}

.toolbar-subtitle {
  margin-top: 8rpx;
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero-card,
.highlight-card,
.footer-card {
  border-radius: 28rpx;
}

.hero-card {
  position: relative;
  overflow: hidden;
  padding: 40rpx 34rpx;
  margin-bottom: 28rpx;
  background: linear-gradient(135deg, rgba(76, 137, 255, 0.16), rgba(104, 193, 255, 0.08));
  border: 1rpx solid rgba(92, 148, 255, 0.2);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  padding: 10rpx 18rpx;
  border-radius: 999rpx;
  background: rgba(76, 137, 255, 0.12);
  color: #4c89ff;
  font-size: 22rpx;
  font-weight: 600;
}

.hero-title {
  margin-top: 22rpx;
  font-size: 48rpx;
  font-weight: 700;
  letter-spacing: 2rpx;
  color: var(--text-primary);
}

.hero-desc {
  margin-top: 18rpx;
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 28rpx;
}

.version-chip {
  margin-top: 28rpx;
  display: inline-flex;
  align-items: center;
  gap: 14rpx;
  padding: 14rpx 22rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.46);
}

.version-label {
  color: var(--text-secondary);
  font-size: 24rpx;
}

.version-value {
  color: var(--text-primary);
  font-size: 26rpx;
  font-weight: 700;
}

.section-block {
  margin-bottom: 28rpx;
}

.section-title {
  margin-bottom: 18rpx;
  padding-left: 8rpx;
  color: var(--text-primary);
  font-size: 30rpx;
  font-weight: 700;
}

.highlight-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.highlight-card {
  display: flex;
  align-items: flex-start;
  gap: 22rpx;
  padding: 28rpx;
}

.highlight-icon {
  width: 72rpx;
  height: 72rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34rpx;
  background: rgba(76, 137, 255, 0.12);
  flex-shrink: 0;
}

.highlight-content {
  flex: 1;
}

.highlight-title {
  color: var(--text-primary);
  font-size: 30rpx;
  font-weight: 600;
}

.highlight-desc {
  margin-top: 10rpx;
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 26rpx;
}

.footer-card {
  padding: 30rpx 28rpx;
}

.footer-title {
  color: var(--text-primary);
  font-size: 30rpx;
  font-weight: 700;
}

.footer-desc {
  margin-top: 12rpx;
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 26rpx;
}
</style>

