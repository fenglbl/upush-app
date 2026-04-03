<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.feedbackPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.feedbackPageDesc') }}</view>
      </view>

      <view class="form-card theme-card">
        <view class="form-item">
          <view class="form-label">{{ tr('setting.feedbackType') }}</view>
          <uv-radio-group v-model="form.type" placement="row" iconPlacement="left" class="feedback-radio-group">
            <uv-radio name="bug" :label="tr('setting.feedbackTypeBug')"></uv-radio>
            <uv-radio name="suggestion" :label="tr('setting.feedbackTypeSuggestion')"></uv-radio>
            <uv-radio name="other" :label="tr('setting.feedbackTypeOther')"></uv-radio>
          </uv-radio-group>
        </view>

        <view class="form-item">
          <view class="form-label">{{ tr('setting.feedbackContact') }}</view>
          <uv-input
            v-model="form.contact"
            :placeholder="tr('setting.feedbackContactPlaceholder')"
            clearable
            border="surround"
            shape="circle"
            customStyle="background: var(--surface-strong); color: var(--text-primary);"
          ></uv-input>
        </view>

        <view class="form-item">
          <view class="form-label">{{ tr('setting.feedbackContent') }}</view>
          <uv-textarea
            v-model="form.content"
            :placeholder="tr('setting.feedbackContentPlaceholder')"
            count
            border="surround"
            height="220"
            customStyle="background: var(--surface-strong); color: var(--text-primary);"
          ></uv-textarea>
        </view>

        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 32rpx;" @click="submitFeedback">{{ tr('setting.feedbackSubmit') }}</uv-button>
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
      form: {
        type: 'bug',
        contact: '',
        content: '',
        screenshots: []
      }
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
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    async submitFeedback() {
      if (!this.form.type) {
        uni.showToast({
          icon: 'none',
          title: this.tr('setting.feedbackTypeRequired')
        })
        return
      }

      if (!this.form.contact) {
        uni.showToast({
          icon: 'none',
          title: this.tr('setting.feedbackContactRequired')
        })
        return
      }

      if (!this.form.content) {
        uni.showToast({
          icon: 'none',
          title: this.tr('setting.feedbackContentRequired')
        })
        return
      }

      const res = await this.$apis.user.submitFeedback(this.form)
      if (res.code === 200) {
        this.$toast(res.msg || this.tr('setting.feedbackSubmitSuccess'), () => {
          this.form = {
            type: 'bug',
            contact: '',
            content: '',
            screenshots: []
          }
        })
      }
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
.form-card { padding: 32rpx; border-radius: 28rpx; }
.form-item { margin-bottom: 28rpx; }
.form-label { margin-bottom: 18rpx; color: var(--text-primary); font-weight: 600; }
.feedback-radio-group :deep(.uv-radio) { margin-right: 28rpx; }
.feedback-radio-group :deep(.uv-radio:last-child) { margin-right: 0; }
</style>

