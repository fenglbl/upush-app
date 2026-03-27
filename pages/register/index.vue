<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="content">
      <view class="hero theme-card">
        <view class="logo-box">
          <image class="logo" src="/static/upush_logo.png"></image>
          <view class="hero-copy">
            <text class="eyebrow">创建账号</text>
            <text class="logo-text">欢迎注册</text>
            <text class="sub-text">填写基础信息后即可创建 upush 账号并返回登录。</text>
          </view>
        </view>
        <view class="form-box">
          <view class="input-box theme-card">
            <input class="input" type="text" placeholder="输入账号" placeholder-class="placeholder" v-model="username" />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="password" placeholder="输入密码" placeholder-class="placeholder" v-model="password" password />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="password" placeholder="确认密码" placeholder-class="placeholder" v-model="confirmPassword" password />
          </view>
        </view>
        <view class="reg">已有账号？<text class="link" @click="toLogin">去登录</text></view>
        <button class="button theme-primary-button" @click="register">注册账号</button>
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
        theme: 'light'
      }
    },
    onLoad() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
    },
    onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
    },
    computed: {
      themeClass() {
        return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
      }
    },
    methods: {
      applyNavTheme() {
        const isDark = this.theme === 'dark'
        uni.setNavigationBarColor({
          frontColor: isDark ? '#ffffff' : '#000000',
          backgroundColor: isDark ? '#0f1d2c' : '#f5f9ff'
        })
      },
      validateForm() {
        if (!this.username) {
          uni.showToast({ icon: 'none', title: '请输入账号' })
          return false
        }
        if (!this.password) {
          uni.showToast({ icon: 'none', title: '请输入密码' })
          return false
        }
        if (this.password.length < 6) {
          uni.showToast({ icon: 'none', title: '密码至少 6 位' })
          return false
        }
        if (!this.confirmPassword) {
          uni.showToast({ icon: 'none', title: '请确认密码' })
          return false
        }
        if (this.password !== this.confirmPassword) {
          uni.showToast({ icon: 'none', title: '两次密码不一致' })
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
          this.$toast(res.msg || '注册成功', () => {
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

  .hero {
    margin-top: 100rpx;
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
