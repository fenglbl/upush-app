<template>
	<view class="theme-page theme-panel" :class="themeClass">
    <view class="content">
      <!-- <view class="topbar">
        <view class="topbar-title">upush</view>
        <button class="theme-switch" @click="toggleTheme">{{ themeButtonText }}</button>
      </view> -->
      <view class="hero theme-card">
        <view class="logo-box">
          <image class="logo" src="/static/upush_logo.png"></image>
          <view class="hero-copy">
            <text class="eyebrow">消息直达</text>
            <text class="logo-text">欢迎登录</text>
            <text class="sub-text">统一管理设备接收、推送消息与消息列表。</text>
          </view>
        </view>
        <view class="form-box">
          <view class="input-box theme-card">
            <input class="input" type="text" placeholder="输入账号" placeholder-class="placeholder" v-model="username" />
          </view>
          <view class="input-box theme-card">
            <input class="input" type="text" placeholder="输入密码" placeholder-class="placeholder" v-model="password" password />
          </view>
        </view>
        <view class="reg">还没有账号？<text class="link" @click="toRegister">注册</text></view>
        <button class="button theme-primary-button" @click="login">登录</button>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        username: "",
        password: "",
				cid: "",
				theme: 'light'
			}
		},
		onLoad() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
      // let token = uni.getStorageSync('token')
      // if(token){
      //   uni.reLaunch({
      //     url:'/pages/home/index'
      //   })
      // }
		},
		onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
		},
		computed: {
      themeClass() {
        return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
      },
      themeButtonText() {
        return this.theme === 'dark' ? '日间模式' : '夜间模式'
      }
		},
		methods: {
      toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark'
        uni.setStorageSync('appTheme', this.theme)
        this.applyNavTheme()
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
          uni.showToast({ icon: 'none', title: '请输入账号' })
          return
        }
        if (!this.password) {
          uni.showToast({ icon: 'none', title: '请输入密码' })
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
    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 52rpx;
      padding-top: 16rpx;
      .topbar-title {
        font-size: 40rpx;
        font-weight: 600;
        letter-spacing: 4rpx;
        color: var(--text-primary);
      }
    }
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
