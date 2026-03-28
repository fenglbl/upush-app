<template>
	<view class="theme-page theme-panel" :class="themeClass">
    <view class="content">
      <uv-navbar
        :title="tr('login.navTitle')"
        :autoBack="true"
        :placeholder="true"
        :safeAreaInsetTop="true"
        :bgColor="navBackgroundColor"
        :titleStyle="{ color: navTitleColor }"
        :leftIconColor="navTitleColor"
      ></uv-navbar>
      <view class="hero theme-card">
        <view class="logo-box">
          <image class="logo" src="/static/upush_logo.png"></image>
          <view class="hero-copy">
            <text class="eyebrow">{{ tr('login.eyebrow') }}</text>
            <text class="logo-text">{{ tr('login.title') }}</text>
            <text class="sub-text">{{ tr('login.subtitle') }}</text>
          </view>
        </view>
        <view class="form-box">
          <view class="input-box theme-card">
            <input class="input" type="text" :placeholder="tr('login.usernamePlaceholder')" placeholder-class="placeholder" v-model="username" />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="text" :placeholder="tr('login.passwordPlaceholder')" placeholder-class="placeholder" v-model="password" password />
          </view>
        </view>
        <view class="reg">{{ tr('login.noAccount') }}<text class="link" @click="toRegister">{{ tr('login.register') }}</text></view>
        <button class="button theme-primary-button" @click="login">{{ tr('login.submit') }}</button>
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
				cid: '',
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
      navBackgroundColor() {
        return this.theme === 'dark' ? '#0f1d2c' : '#f5f9ff'
      },
      navTitleColor() {
        return this.theme === 'dark' ? '#ffffff' : '#17324d'
      }
		},
		methods: {
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
      async login() {
        if (!this.username) {
          uni.showToast({ icon: 'none', title: this.tr('login.usernameRequired') })
          return
        }
        if (!this.password) {
          uni.showToast({ icon: 'none', title: this.tr('login.passwordRequired') })
          return
        }
        const cid = uni.getStorageSync('cid')
        let user = await this.$apis.user.login({
          username: this.username,
          password: this.password,
          cid: cid
        })
        if (user.code == 200) {
          uni.setStorageSync('userInfo', user.data)
          uni.setStorageSync('token', user.data.token)
          this.$toast(user.msg, () => {
            uni.reLaunch({
              url: '/pages/home/index'
            })
          })
        }
      },
      toRegister() {
        uni.navigateTo({
          url: '/pages/register/index'
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
