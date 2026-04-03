<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.userAgreementPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.userAgreementPageDesc') }}</view>
      </view>

      <uv-loading-page
        :loading="loading"
        :loadingText="tr('common.loading')"
        :bgColor="loadingBgColor"
        color="#8fa2b8"
        loadingColor="#54b2ff"
      ></uv-loading-page>

      <view class="agreement-card theme-card" v-if="agreement.title || agreement.content">
        <view class="agreement-title">{{ agreement.title }}</view>
        <view class="agreement-time" v-if="agreement.publish_time">{{ formatTime(agreement.publish_time) }}</view>
        <rich-text class="agreement-content" :nodes="agreement.content"></rich-text>
      </view>

      <view class="placeholder-card theme-card" v-else>
        <uv-empty mode="data" :text="tr('setting.userAgreementPageTitle')"></uv-empty>
        <view class="placeholder-desc">{{ tr('setting.userAgreementPageDesc') }}</view>
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
      loading: false,
      agreement: {}
    }
  },
  onLoad() {
    this.syncState()
    this.fetchAgreement()
  },
  onShow() {
    this.syncState()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
    },
    loadingBgColor() {
      return this.theme === 'dark' ? 'rgba(13, 23, 34, 0.88)' : 'rgba(245, 249, 255, 0.92)'
    }
  },
  methods: {
    syncState() {
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    async fetchAgreement() {
      this.loading = true
      const res = await this.$apis.user.getAgreement({
        agreement_id: 'user_service'
      })
      this.loading = false

      if (res.code === 200) {
        this.agreement = res.data
        return
      }

      uni.showToast({
        icon: 'none',
        title: this.tr('setting.agreementLoadFailed')
      })
    },
    formatTime(value) {
      return this.$formatTime(value)
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
.setting-shell { min-height: 100vh; padding: 36rpx 28rpx 48rpx; }
.toolbar { margin-bottom: 24rpx; }
.toolbar-subtitle { margin-top: 8rpx; color: var(--text-secondary); }
.agreement-card { padding: 40rpx 32rpx; border-radius: 28rpx; }
.agreement-title { font-size: 38rpx; font-weight: 700; color: var(--text-primary); }
.agreement-time { margin-top: 12rpx; color: var(--text-muted); }
.agreement-content { margin-top: 28rpx; color: var(--text-secondary); line-height: 42rpx; }
.placeholder-card { padding: 48rpx 36rpx; border-radius: 28rpx; }
.placeholder-desc { color: var(--text-secondary); line-height: 42rpx; text-align: center; }
</style>

