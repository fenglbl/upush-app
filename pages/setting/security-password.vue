<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.securityPasswordPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.securityPasswordPageDesc') }}</view>
      </view>

      <view class="form-card theme-card">
        <uv-input v-model="password" type="password" :placeholder="tr('setting.securityPasswordPlaceholder')" clearable border="surround" shape="circle" customStyle="background: var(--surface-strong); color: var(--text-primary);"></uv-input>
        <uv-input v-model="confirmPassword" type="password" :placeholder="tr('setting.securityConfirmPasswordPlaceholder')" clearable border="surround" shape="circle" customStyle="background: var(--surface-strong); color: var(--text-primary); margin-top: 20rpx;"></uv-input>
        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 28rpx;" @click="submit">{{ tr('setting.securityChangePassword') }}</uv-button>
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
      userInfo: {},
      oldEmail: '',
      changeEmailToken: '',
      password: '',
      confirmPassword: ''
    }
  },
  onLoad(options = {}) {
    this.syncState()
    this.oldEmail = decodeURIComponent(options.oldEmail || '')
    this.changeEmailToken = decodeURIComponent(options.changeEmailToken || '')
    if (!this.ensureValidSession()) {
      return
    }
  },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.userInfo = uni.getStorageSync('userInfo') || {}
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
      if (!this.password) {
        uni.showToast({ icon: 'none', title: this.tr('setting.securityPasswordRequired') })
        return
      }
      if (this.password.length < 6) {
        uni.showToast({ icon: 'none', title: this.tr('setting.securityPasswordMin') })
        return
      }
      if (!this.confirmPassword) {
        uni.showToast({ icon: 'none', title: this.tr('setting.securityConfirmPasswordRequired') })
        return
      }
      if (this.password !== this.confirmPassword) {
        uni.showToast({ icon: 'none', title: this.tr('setting.securityPasswordMismatch') })
        return
      }
      const res = await this.$apis.user.changePassword({
        change_email_token: this.changeEmailToken,
        password: this.password,
        confirm_password: this.confirmPassword
      })
      if (res.code === 200) {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        this.$toast(this.tr('setting.securityPasswordChangeSuccessRelogin'))
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
</style>
