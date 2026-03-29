<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.profilePageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.profilePageDesc') }}</view>
      </view>

      <view class="profile-card theme-card">
        <view class="avatar">{{ avatarText }}</view>
        <view class="profile-main">
          <view class="nickname">{{ profile.nickname || '--' }}</view>
          <view class="hint">{{ tr('setting.profileUserId') }}: {{ profile.id || '--' }}</view>
        </view>
      </view>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('setting.profileAvatar')" :value="avatarText" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('setting.profileUsername')" :value="profile.username || '--'" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('setting.profileUserId')" :value="profile.id || '--'" :border="false" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :valueStyle="cellValueStyle"></uv-cell>
      </uv-cell-group>

      <view class="form-card theme-card">
        <view class="form-title">{{ tr('setting.profileNickname') }}</view>
        <uv-input
          v-model="nickname"
          :placeholder="tr('setting.profileNicknamePlaceholder')"
          clearable
          border="surround"
          shape="circle"
          customStyle="background: var(--surface-strong);"
        ></uv-input>

        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 32rpx;" @click="saveProfile">{{ tr('setting.profileSave') }}</uv-button>
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
      profile: {},
      nickname: ''
    }
  },
  onLoad() {
    this.syncState()
  },
  onShow() {
    this.syncState()
  },
  computed: {
    themeClass() {
      return this.theme === 'dark' ? 'theme-dark' : 'theme-light'
    },
    avatarText() {
      const source = this.profile.nickname || this.profile.username || 'U'
      return source.slice(0, 1).toUpperCase()
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
    cellValueStyle() {
      return {
        color: 'var(--text-secondary)'
      }
    }
  },
  methods: {
    syncState() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.profile = uni.getStorageSync('userInfo') || {}
      this.nickname = this.profile.nickname || this.profile.username || ''
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
    },
    tr(path) {
      return this.$t(path, this.locale)
    },
    async saveProfile() {
      if (!this.nickname) {
        uni.showToast({
          icon: 'none',
          title: this.tr('setting.profileNicknamePlaceholder')
        })
        return
      }
      const res = await this.$apis.user.updateProfile({
        nickname: this.nickname
      })
      if (res.code === 200) {
        const nextUserInfo = {
          ...this.profile,
          ...res.data
        }
        uni.setStorageSync('userInfo', nextUserInfo)
        this.profile = nextUserInfo
        this.$toast(res.msg || this.tr('setting.profileSaveSuccess'))
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

.profile-card {
  display: flex;
  align-items: center;
  padding: 32rpx;
  border-radius: 28rpx;
  margin-bottom: 24rpx;
}

.avatar {
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42rpx;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-color) 0%, #3fb2ff 100%);
  color: var(--button-text);
  margin-right: 24rpx;
}

.profile-main {
  flex: 1;
}

.nickname {
  font-size: 38rpx;
  font-weight: 600;
  color: var(--text-primary);
}

.hint {
  margin-top: 10rpx;
  color: var(--text-secondary);
}

.form-card {
  padding: 32rpx;
  border-radius: 28rpx;
}

.form-title {
  margin-bottom: 20rpx;
  color: var(--text-primary);
  font-weight: 600;
}
</style>
