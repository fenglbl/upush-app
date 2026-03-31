<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.securityNewEmailPageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.securityNewEmailPageDesc') }}</view>
      </view>

      <view class="form-card theme-card">
        <view class="form-title">{{ tr('setting.securityCurrentEmail') }}</view>
        <uv-input
          :modelValue="maskedOldEmail"
          readonly
          disabled
          border="surround"
          shape="circle"
          customStyle="background: var(--surface-strong); color: var(--text-primary);"
        ></uv-input>

        <view class="form-title form-title-spaced">{{ tr('setting.securityNewEmail') }}</view>
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
            :placeholder="tr('setting.securityNewEmailCodePlaceholder')"
            clearable
            border="surround"
            shape="circle"
            customStyle="background: var(--surface-strong); color: var(--text-primary);"
          ></uv-input>
          <uv-button type="primary" shape="circle" :disabled="newEmailCountdown > 0" :customStyle="newEmailButtonStyle" @click="sendNewEmailCode">{{ newEmailButtonText }}</uv-button>
        </view>

        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 28rpx;" @click="saveEmail">{{ tr('setting.securitySaveEmail') }}</uv-button>
      </view>
    </view>
  </view>
</template>

<script>
const COUNTDOWN_SECONDS = 90
const NEW_EMAIL_COUNTDOWN_KEY = 'securityEmailNewCountdownUntil'

export default {
  data() {
    return {
      theme: 'light',
      locale: 'zh',
      userInfo: {},
      oldEmail: '',
      changeEmailToken: '',
      email: '',
      emailCode: '',
      newEmailCountdown: 0,
      newEmailTimer: null
    }
  },
  onLoad(options = {}) {
    this.syncState()
    this.oldEmail = decodeURIComponent(options.oldEmail || this.userInfo.email || '')
    this.changeEmailToken = decodeURIComponent(options.changeEmailToken || '')
  },
  onShow() {
    this.$applyTabBarI18n(this.locale)
    this.$applyTabBarTheme(this.theme)
    this.applyNavTheme()
    this.restoreNewEmailCountdown()
  },
  onUnload() {
    this.clearNewEmailTimer()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
    },
    maskedOldEmail() {
      return this.maskEmail(this.oldEmail)
    },
    newEmailButtonText() {
      return this.newEmailCountdown > 0 ? `${this.newEmailCountdown}s` : this.tr('setting.securitySendNewEmailCode')
    },
    newEmailButtonStyle() {
      return this.newEmailCountdown > 0
        ? 'height: 72rpx; background: #c7cbd4 !important; color: #ffffff !important; border-color: #c7cbd4 !important;'
        : 'height: 72rpx;'
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
    maskEmail(email) {
      if (!email) {
        return '--'
      }
      const [localPart, domain] = String(email).split('@')
      if (!localPart || !domain) {
        return email
      }
      if (localPart.length <= 1) {
        return `${localPart}***@${domain}`
      }
      if (localPart.length === 2) {
        return `${localPart[0]}***@${domain}`
      }
      return `${localPart[0]}***${localPart[localPart.length - 1]}@${domain}`
    },
    isValidEmail(email) {
      return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    },
    getNewEmailCountdownRemaining() {
      const expireAt = Number(uni.getStorageSync(NEW_EMAIL_COUNTDOWN_KEY) || 0)
      if (!expireAt) {
        return 0
      }
      const remaining = Math.ceil((expireAt - Date.now()) / 1000)
      return remaining > 0 ? remaining : 0
    },
    restoreNewEmailCountdown() {
      const remaining = this.getNewEmailCountdownRemaining()
      if (remaining > 0) {
        this.startNewEmailCountdown(remaining, false)
      } else {
        uni.removeStorageSync(NEW_EMAIL_COUNTDOWN_KEY)
        this.newEmailCountdown = 0
      }
    },
    startNewEmailCountdown(seconds = COUNTDOWN_SECONDS, persist = true) {
      this.clearNewEmailTimer()
      this.newEmailCountdown = seconds
      if (persist) {
        uni.setStorageSync(NEW_EMAIL_COUNTDOWN_KEY, Date.now() + seconds * 1000)
      }
      this.newEmailTimer = setInterval(() => {
        const remaining = this.getNewEmailCountdownRemaining()
        if (remaining <= 0) {
          this.clearNewEmailTimer()
          this.newEmailCountdown = 0
          uni.removeStorageSync(NEW_EMAIL_COUNTDOWN_KEY)
          return
        }
        this.newEmailCountdown = remaining
      }, 1000)
    },
    clearNewEmailTimer() {
      if (this.newEmailTimer) {
        clearInterval(this.newEmailTimer)
        this.newEmailTimer = null
      }
    },
    sendNewEmailCode() {
      if (this.newEmailCountdown > 0) {
        return
      }
      if (!this.changeEmailToken) {
        uni.showToast({ icon: 'none', title: this.tr('setting.changeEmailSessionInvalid') })
        return
      }
      if (!this.email) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailRequired') })
        return
      }
      if (!this.isValidEmail(this.email)) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailInvalid') })
        return
      }
      if (this.oldEmail && this.oldEmail.toLowerCase() === this.email.toLowerCase()) {
        uni.showToast({ icon: 'none', title: this.tr('setting.newEmailSameAsOld') })
        return
      }
      this.$apis.user.sendEmailCode({
        email: this.email,
        scene: 'verify_new_email'
      }).then((res) => {
        if (res.code === 200) {
          this.startNewEmailCountdown(COUNTDOWN_SECONDS, true)
          this.$toast(res.msg)
        } else {
          uni.showToast({ icon: 'none', title: res.msg || this.tr('common.networkError') })
        }
      })
    },
    async saveEmail() {
      if (!this.changeEmailToken) {
        uni.showToast({ icon: 'none', title: this.tr('setting.changeEmailSessionInvalid') })
        return
      }
      if (!this.email) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailRequired') })
        return
      }
      if (!this.isValidEmail(this.email)) {
        uni.showToast({ icon: 'none', title: this.tr('register.emailInvalid') })
        return
      }
      if (this.oldEmail && this.oldEmail.toLowerCase() === this.email.toLowerCase()) {
        uni.showToast({ icon: 'none', title: this.tr('setting.newEmailSameAsOld') })
        return
      }
      if (!this.emailCode) {
        uni.showToast({ icon: 'none', title: this.tr('setting.newEmailCodeRequired') })
        return
      }

      const res = await this.$apis.user.updateProfile({
        nickname: this.userInfo.nickname || this.userInfo.username,
        old_email: this.oldEmail,
        change_email_token: this.changeEmailToken,
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
        uni.removeStorageSync(NEW_EMAIL_COUNTDOWN_KEY)
        this.clearNewEmailTimer()
        this.newEmailCountdown = 0
        this.$toast(this.tr('setting.securityEmailSaveSuccess'))
        setTimeout(() => {
          uni.navigateBack({ delta: 2 })
        }, 500)
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

.form-title {
  margin-bottom: 20rpx;
  color: var(--text-primary);
  font-weight: 600;
}

.form-title-spaced {
  margin-top: 28rpx;
}

.verify-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16rpx;
  margin-top: 20rpx;
  align-items: center;
}
</style>
