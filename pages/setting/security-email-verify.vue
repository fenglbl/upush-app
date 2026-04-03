<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="pageTitle" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ pageDesc }}</view>
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

        <view class="verify-row">
          <uv-input
            v-model="oldEmailCode"
            :placeholder="tr('setting.securityOldEmailCodePlaceholder')"
            clearable
            border="surround"
            shape="circle"
            customStyle="background: var(--surface-strong); color: var(--text-primary);"
          ></uv-input>
          <uv-button type="primary" shape="circle" :disabled="countdown > 0" :customStyle="sendButtonStyle" @click="sendOldEmailCode">{{ sendButtonText }}</uv-button>
        </view>

        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 28rpx;" @click="verifyAndContinue">{{ tr('setting.securityNextStep') }}</uv-button>
      </view>
    </view>
  </view>
</template>

<script>
import { resolveTheme } from '@/common/lib/theme.js'

const COUNTDOWN_SECONDS = 90
const COUNTDOWN_KEY_PREFIX = 'securityVerifyCountdownUntil:'

const ACTION_CONFIG = {
  change_email: {
    titleKey: 'setting.securityVerifyOldEmailPageTitle',
    descKey: 'setting.securityVerifyOldEmailDesc',
    nextUrl: '/pages/setting/security-email-new'
  },
  change_password: {
    titleKey: 'setting.securityVerifyPasswordPageTitle',
    descKey: 'setting.securityVerifyPasswordDesc',
    nextUrl: '/pages/setting/security-password'
  },
  close_account: {
    titleKey: 'setting.securityVerifyCloseAccountPageTitle',
    descKey: 'setting.securityVerifyCloseAccountDesc',
    nextUrl: '/pages/setting/security-close-account'
  }
}

export default {
  data() {
    return {
      theme: 'light',
      locale: 'zh',
      userInfo: {},
      action: 'change_email',
      oldEmail: '',
      oldEmailCode: '',
      countdown: 0,
      countdownTimer: null
    }
  },
  onLoad(options = {}) {
    this.syncState()
    if (options.action && ACTION_CONFIG[options.action]) {
      this.action = options.action
    }
  },
  onShow() {
    this.syncState()
    this.fetchUserInfo()
    this.restoreCountdown()
  },
  onUnload() {
    this.clearCountdownTimer()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
    },
    pageTitle() {
      return this.tr(ACTION_CONFIG[this.action].titleKey)
    },
    pageDesc() {
      return this.tr(ACTION_CONFIG[this.action].descKey)
    },
    maskedOldEmail() {
      return this.maskEmail(this.oldEmail)
    },
    sendButtonText() {
      return this.countdown > 0 ? `${this.countdown}s` : this.tr('setting.securitySendOldEmailCode')
    },
    sendButtonStyle() {
      return this.countdown > 0
        ? 'height: 72rpx; background: #c7cbd4 !important; color: #ffffff !important; border-color: #c7cbd4 !important;'
        : 'height: 72rpx;'
    }
  },
  methods: {
    syncState() {
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.userInfo = uni.getStorageSync('userInfo') || {}
      this.oldEmail = this.userInfo.email || ''
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
    getCountdownStorageKey() {
      return `${COUNTDOWN_KEY_PREFIX}${this.action}`
    },
    getCountdownRemaining() {
      const expireAt = Number(uni.getStorageSync(this.getCountdownStorageKey()) || 0)
      if (!expireAt) {
        return 0
      }
      const remaining = Math.ceil((expireAt - Date.now()) / 1000)
      return remaining > 0 ? remaining : 0
    },
    restoreCountdown() {
      const remaining = this.getCountdownRemaining()
      if (remaining > 0) {
        this.startCountdown(remaining, false)
      } else {
        uni.removeStorageSync(this.getCountdownStorageKey())
        this.countdown = 0
      }
    },
    startCountdown(seconds = COUNTDOWN_SECONDS, persist = true) {
      this.clearCountdownTimer()
      this.countdown = seconds
      if (persist) {
        uni.setStorageSync(this.getCountdownStorageKey(), Date.now() + seconds * 1000)
      }
      this.countdownTimer = setInterval(() => {
        const remaining = this.getCountdownRemaining()
        if (remaining <= 0) {
          this.clearCountdownTimer()
          this.countdown = 0
          uni.removeStorageSync(this.getCountdownStorageKey())
          return
        }
        this.countdown = remaining
      }, 1000)
    },
    clearCountdownTimer() {
      if (this.countdownTimer) {
        clearInterval(this.countdownTimer)
        this.countdownTimer = null
      }
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
        this.oldEmail = nextUserInfo.email || ''
      }
    },
    sendOldEmailCode() {
      if (this.countdown > 0) {
        return
      }
      if (!this.oldEmail) {
        uni.showToast({ icon: 'none', title: this.tr('setting.oldEmailRequired') })
        return
      }
      this.$apis.user.sendEmailCode({
        email: this.oldEmail,
        scene: 'verify_old_email'
      }).then((res) => {
        if (res.code === 200) {
          this.startCountdown(COUNTDOWN_SECONDS, true)
          this.$toast(res.msg)
        } else {
          uni.showToast({ icon: 'none', title: res.msg || this.tr('common.networkError') })
        }
      })
    },
    async verifyAndContinue() {
      if (!this.oldEmail) {
        uni.showToast({ icon: 'none', title: this.tr('setting.oldEmailRequired') })
        return
      }
      if (!this.oldEmailCode) {
        uni.showToast({ icon: 'none', title: this.tr('setting.oldEmailCodeRequired') })
        return
      }
      const res = await this.$apis.user.verifyOldEmailForChange({
        old_email: this.oldEmail,
        old_email_code: this.oldEmailCode
      })
      if (res.code === 200) {
        const nextUrl = ACTION_CONFIG[this.action].nextUrl
        uni.navigateTo({
          url: `${nextUrl}?oldEmail=${encodeURIComponent(this.oldEmail)}&changeEmailToken=${encodeURIComponent(res.data.change_email_token || '')}`
        })
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

.verify-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16rpx;
  margin-top: 20rpx;
  align-items: center;
}
</style>

