<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.securityEmailPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.securityEmailDesc') }}</view>
      </view>

      <view class="form-card theme-card">
        <view class="form-title">{{ tr('setting.securityEmail') }}</view>
        <uv-input
          v-model="email"
          :placeholder="tr('setting.securityEmailPlaceholder')"
          clearable
          border="surround"
          shape="circle"
          customStyle="background: var(--surface-strong); color: var(--text-primary);"
        ></uv-input>

        <view class="verify-row">
          <uv-input
            v-model="emailCode"
            :placeholder="tr('setting.securityEmailCodePlaceholder')"
            clearable
            border="surround"
            shape="circle"
            customStyle="background: var(--surface-strong); color: var(--text-primary);"
          ></uv-input>
          <uv-button type="primary" shape="circle" @click="sendEmailCode">{{ tr('setting.securitySendCode') }}</uv-button>
        </view>

        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 28rpx;" @click="saveEmail">{{ tr('setting.securitySaveEmail') }}</uv-button>
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
      email: '',
      emailCode: ''
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
    }
  },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.userInfo = uni.getStorageSync('userInfo') || {}
      this.email = this.userInfo.email || ''
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
        this.email = nextUserInfo.email || ''
      }
    },
    sendEmailCode() {
      if (!this.email) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailRequired') })
        return
      }
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email)) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailInvalid') })
        return
      }
      this.$apis.user.sendEmailCode({
        email: this.email,
        scene: 'update_email'
      }).then((res) => {
        if (res.code === 200) {
          this.$toast(res.msg)
        }
      })
    },
    async saveEmail() {
      if (!this.email) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailRequired') })
        return
      }
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(this.email)) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailInvalid') })
        return
      }
      if (!this.emailCode) {
        uni.showToast({ icon: 'none', title: this.tr('setting.emailCodeRequired') })
        return
      }

      const res = await this.$apis.user.updateProfile({
        nickname: this.userInfo.nickname || this.userInfo.username,
        email: this.email,
        email_code: this.emailCode
      })
      if (res.code === 200) {
        const nextUserInfo = {
          ...this.userInfo,
          ...res.data
        }
        uni.setStorageSync('userInfo', nextUserInfo)
        this.userInfo = nextUserInfo
        this.email = nextUserInfo.email || ''
        this.emailCode = ''
        this.$toast(this.tr('setting.securityEmailSaveSuccess'))
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

.form-title {
  margin-bottom: 20rpx;
  color: var(--text-primary);
  font-weight: 600;
}

.verify-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16rpx;
  margin-top: 20rpx;
  align-items: center;
}
</style>
