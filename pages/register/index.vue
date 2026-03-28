<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="content">
      <view class="toolbar-actions">
        <button class="theme-switch" @click="toggleLocale">{{ localeButtonText }}</button>
      </view>
      <view class="hero theme-card">
        <view class="logo-box">
          <image class="logo" src="/static/upush_logo.png"></image>
          <view class="hero-copy">
            <text class="eyebrow">{{ tr('register.eyebrow') }}</text>
            <text class="logo-text">{{ tr('register.title') }}</text>
            <text class="sub-text">{{ tr('register.subtitle') }}</text>
          </view>
        </view>
        <view class="form-box">
          <view class="input-box theme-card">
            <input class="input" type="text" :placeholder="tr('register.usernamePlaceholder')" placeholder-class="placeholder" v-model="username" />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="password" :placeholder="tr('register.passwordPlaceholder')" placeholder-class="placeholder" v-model="password" password />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="password" :placeholder="tr('register.confirmPasswordPlaceholder')" placeholder-class="placeholder" v-model="confirmPassword" password />
          </view>
        </view>
        <view class="reg">{{ tr('register.hasAccount') }}<text class="link" @click="toLogin">{{ tr('register.goLogin') }}</text></view>
        <button class="button theme-primary-button" @click="register">{{ tr('register.submit') }}</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        theme: 'light',
        locale: 'zh'
      }
    },
    onLoad() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.applyNavTheme()
    },
    onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.applyNavTheme()
    },
    computed: {
      themeClass() {
        return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
      },
      localeButtonText() {
        return this.locale === 'zh' ? 'EN' : '中文'
      }
    },
    methods: {
      toggleLocale() {
        this.locale = this.$setLocale(this.locale === 'zh' ? 'en' : 'zh')
      },
      tr(path) {
        return this.$t(path, this.locale)
      },
      applyNavTheme() {
        const isDark = this.theme === 'dark'
        uni.setNavigationBarColor({
          frontColor: isDark ? '#ffffff' : '#000000',
          backgroundColor: isDark ? '#0f1d2c' : '#f5f9ff'
        })
      },
      validateForm() {
        if (!this.username) {
          uni.showToast({ icon: 'none', title: this.tr('register.usernameRequired') })
          return false
        }
        if (!this.password) {
          uni.showToast({ icon: 'none', title: this.tr('register.passwordRequired') })
          return false
        }
        if (this.password.length < 6) {
          uni.showToast({ icon: 'none', title: this.tr('register.passwordMin') })
          return false
        }
        if (!this.confirmPassword) {
          uni.showToast({ icon: 'none', title: this.tr('register.confirmPasswordRequired') })
          return false
        }
        if (this.password !== this.confirmPassword) {
          uni.showToast({ icon: 'none', title: this.tr('register.passwordMismatch') })
          return false
        }
        return true
      },
      async register() {
        if (!this.validateForm()) {
          return
        }
        const res = await this.$apis.user.register({
          username: this.username,
          password: this.password
        })
        if (res.code === 200) {
          this.$toast(res.msg || this.tr('register.success'), () => {
            uni.navigateBack({
              delta: 1
            })
          })
        }
      },
      toLogin() {
        uni.navigateBack({
          delta: 1
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  padding: 36rpx 28rpx 48rpx;
  min-height: 100vh;

  .toolbar-actions {
    display: flex;
    justify-content: flex-end;
  }

  .hero {
    margin-top: 72rpx;
    padding: 40rpx 36rpx 48rpx;
    border-radius: 36rpx;
  }

  .logo-box {
    width: 100%;
    display: flex;
    align-items: center;

    .logo {
      height: 160rpx;
      width: 160rpx;
      border-radius: 28rpx;
      overflow: hidden;
      box-shadow: 0 20rpx 50rpx -28rpx var(--shadow-color);
    }

    .hero-copy {
      flex: 1;
      padding-left: 28rpx;
    }

    .eyebrow {
      display: block;
      font-size: 24rpx;
      letter-spacing: 6rpx;
      text-transform: uppercase;
      color: var(--accent-color);
      margin-bottom: 12rpx;
    }

    .logo-text {
      display: block;
      font-size: 64rpx;
      line-height: 70rpx;
      font-weight: 600;
      color: var(--text-primary);
    }

    .sub-text {
      display: block;
      margin-top: 16rpx;
      color: var(--text-secondary);
      line-height: 40rpx;
    }
  }

  .form-box {
    margin-top: 56rpx;
  }

  .input-box {
    margin-top: 20rpx;
    border-radius: 26rpx;

    .input {
      height: 100rpx;
      padding: 0 26rpx;
      width: 100%;
    }
  }

  .reg {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 40rpx;
    width: 100%;
    color: var(--text-secondary);

    .link {
      color: var(--accent-color);
    }
  }

  .button {
    margin-top: 120rpx;
    width: 100%;
    height: 96rpx;
    border-radius: 30rpx;
    font-size: 30rpx;
    font-weight: 600;

    &.button-hover {
      opacity: .88;
    }
  }
}
</style>
