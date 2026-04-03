<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.contactUsPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.contactUsPageDesc') }}</view>
      </view>

      <uv-loading-page
        :loading="loading"
        :loadingText="tr('common.loading')"
        :bgColor="loadingBgColor"
        color="#8fa2b8"
        loadingColor="#54b2ff"
      ></uv-loading-page>

      <uv-cell-group v-if="contactList.length" :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          v-for="(item, index) in contactList"
          :key="item._id || index"
          :title="formatType(item.type)"
          :value="item.value"
          isLink
          :border="index !== contactList.length - 1"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :valueStyle="cellValueStyle"
          @click="copyValue(item.value)"
        ></uv-cell>
      </uv-cell-group>

      <view class="placeholder-card theme-card" v-else>
        <uv-empty mode="data" :text="tr('setting.contactUsPageTitle')"></uv-empty>
        <view class="placeholder-desc">{{ tr('setting.contactUsPageDesc') }}</view>
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
      contactList: []
    }
  },
  onLoad() {
    this.syncState()
    this.fetchContactList()
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
    },
    cellStyle() {
      return {
        background: 'var(--surface-bg)',
        color: 'var(--text-primary)'
      }
    },
    cellTitleStyle() {
      return {
        color: 'var(--text-primary)',
        fontWeight: '600'
      }
    },
    cellValueStyle() {
      return {
        color: 'var(--accent-color)'
      }
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
    async fetchContactList() {
      this.loading = true
      const res = await this.$apis.user.getContactList({})
      this.loading = false
      if (res.code === 200) {
        this.contactList = res.data.list || []
      }
    },
    formatType(type) {
      const typeMap = {
        email: 'Email',
        wechat: 'WeChat',
        phone: 'Phone'
      }
      return typeMap[type] || type
    },
    copyValue(value) {
      if (!value) {
        return
      }
      uni.setClipboardData({
        data: value
      })
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
.placeholder-card { padding: 48rpx 36rpx; border-radius: 28rpx; text-align: center; }
.placeholder-desc { margin-top: 18rpx; color: var(--text-secondary); }
</style>

