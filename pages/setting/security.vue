<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.securityPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.securityPageDesc') }}</view>
      </view>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('setting.securityMemberName')" :value="userInfo.username || '--'" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('setting.securityEmail')" :label="tr('setting.securityEmailDesc')" :value="userInfo.email || '--'" isLink :border="false" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="goEmailSetting"></uv-cell>
      </uv-cell-group>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('setting.securityChangePassword')" :label="tr('setting.securityChangePasswordDesc')" isLink :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('setting.securityCloseAccount')" :label="tr('setting.securityCloseAccountDesc')" isLink :border="false" :cellStyle="cellStyle" :titleStyle="dangerTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
      </uv-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light',
      locale: 'zh',
      userInfo: {}
    }
  },
  onLoad() {
    this.syncState()
  },
  onShow() {
    this.syncState()
    this.fetchUserInfo()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
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
    cellLabelStyle() {
      return {
        color: 'var(--text-secondary)'
      }
    },
    cellValueStyle() {
      return {
        color: 'var(--text-secondary)'
      }
    },
    dangerTitleStyle() {
      return {
        color: '#e45151',
        fontWeight: '600'
      }
    }
  },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.userInfo = uni.getStorageSync('userInfo') || {}
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    async fetchUserInfo() {
      const token = uni.getStorageSync('token')
      if (!token) {
        return
      }
      const res = await this.$apis.user.getUserInfo({})
      if (res.code === 200) {
        const nextUserInfo = {
          ...this.userInfo,
          ...res.data
        }
        uni.setStorageSync('userInfo', nextUserInfo)
        this.userInfo = nextUserInfo
      }
    },
    goEmailSetting() {
      uni.navigateTo({
        url: '/pages/setting/security-email'
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
.setting-shell {
  min-height: 100vh;
  padding: 36rpx 28rpx 48rpx;
}

.toolbar {
  margin-bottom: 24rpx;
}

.toolbar-subtitle {
  margin-top: 8rpx;
  color: var(--text-secondary);
}
</style>
