<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.securityCloseAccountPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.securityCloseAccountPageDesc') }}</view>
      </view>

      <view class="form-card theme-card">
        <view class="danger-tip">{{ tr('setting.securityCloseAccountWarning') }}</view>
        <uv-input v-model="confirmText" placeholder="DELETE" clearable border="surround" shape="circle" customStyle="background: var(--surface-strong); color: var(--text-primary); margin-top: 24rpx;"></uv-input>
        <uv-button type="error" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 28rpx;" @click="submit">{{ tr('setting.securityCloseAccount') }}</uv-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      theme: 'light',
      locale: 'zh',
      changeEmailToken: '',
      confirmText: ''
    }
  },
  onLoad(options = {}) {
    this.syncState()
    this.changeEmailToken = decodeURIComponent(options.changeEmailToken || '')
    if (!this.ensureValidSession()) {
      return
    }
  },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    ensureValidSession() {
      if (this.changeEmailToken) {
        return true
      }
      uni.showToast({ icon: 'none', title: this.tr('setting.changeEmailSessionInvalid') })
      setTimeout(() => {
        uni.redirectTo({ url: '/pages/setting/security' })
      }, 300)
      return false
    },
    async submit() {
      if (!this.changeEmailToken) {
        uni.showToast({ icon: 'none', title: this.tr('setting.changeEmailSessionInvalid') })
        return
      }
      if (this.confirmText !== 'DELETE') {
        uni.showToast({ icon: 'none', title: this.tr('setting.securityCloseAccountConfirmRequired') })
        return
      }

      const confirmRes = await new Promise((resolve) => {
        uni.showModal({
          title: this.tr('setting.securityCloseAccountModalTitle'),
          content: this.tr('setting.securityCloseAccountModalContent'),
          confirmColor: '#e45151',
          success: resolve,
          fail: () => resolve({ confirm: false, cancel: true })
        })
      })

      if (!confirmRes.confirm) {
        return
      }

      const res = await this.$apis.user.closeAccount({
        change_email_token: this.changeEmailToken,
        confirm_text: this.confirmText
      })
      if (res.code === 200) {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        this.$toast(res.msg)
        setTimeout(() => {
          uni.reLaunch({ url: '/pages/login/index' })
        }, 800)
      } else {
        uni.showToast({ icon: 'none', title: res.msg || this.tr('common.networkError') })
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

.form-card {
  padding: 32rpx;
  border-radius: 28rpx;
  margin-bottom: 24rpx;
}

.danger-tip {
  color: #e45151;
  line-height: 1.7;
}
</style>
