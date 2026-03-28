<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="mine-shell">
      <view class="toolbar">
        <view>
          <view class="toolbar-title">{{ tr('mine.title') }}</view>
          <view class="toolbar-subtitle">{{ tr('mine.subtitle') }}</view>
        </view>
      </view>

      <view class="profile-card theme-card">
        <view class="avatar">{{ avatarText }}</view>
        <view class="profile-main">
          <view class="nickname">{{ displayName }}</view>
          <view class="hint">{{ token ? tr('mine.userId') + ': ' + displayId : tr('mine.loginHint') }}</view>
        </view>
      </view>

      <view class="info-list theme-card">
        <view class="info-item">
          <text class="label">{{ tr('mine.nickname') }}</text>
          <text class="value">{{ userInfo.nickname || '--' }}</text>
        </view>
        <view class="info-item">
          <text class="label">{{ tr('mine.username') }}</text>
          <text class="value">{{ userInfo.username || '--' }}</text>
        </view>
        <view class="info-item">
          <text class="label">{{ tr('mine.userId') }}</text>
          <text class="value">{{ userInfo.id || '--' }}</text>
        </view>
        <view class="info-item">
          <text class="label">{{ tr('mine.languageLabel') }}</text>
          <text class="value">{{ locale === 'zh' ? tr('setting.chinese') : tr('setting.english') }}</text>
        </view>
      </view>

      <view class="menu-list theme-card">
        <view class="menu-item" @click="goSetting">
          <view>
            <view class="menu-title">{{ tr('mine.settingEntry') }}</view>
            <view class="menu-desc">{{ tr('mine.settingHint') }}</view>
          </view>
          <view class="menu-arrow">></view>
        </view>
      </view>

      <view class="action-list">
        <button v-if="!token" class="action-button theme-primary-button" @click="goLogin">{{ tr('common.goLogin') }}</button>
        <button v-else class="action-button logout-button" @click="logout">{{ tr('common.logout') }}</button>
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
        token: '',
        userInfo: {}
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
      displayName() {
        return this.userInfo.nickname || this.userInfo.username || 'upush'
      },
      displayId() {
        return this.userInfo.id || '--'
      },
      avatarText() {
        const source = this.userInfo.nickname || this.userInfo.username || 'U'
        return source.slice(0, 1).toUpperCase()
      }
    },
    methods: {
      syncState() {
        this.theme = uni.getStorageSync('appTheme') || 'light'
        this.locale = this.$getLocale()
        this.token = uni.getStorageSync('token') || ''
        this.userInfo = uni.getStorageSync('userInfo') || {}
        this.applyNavTheme()
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
      goSetting() {
        uni.navigateTo({
          url: '/pages/setting/index'
        })
      },
      goLogin() {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      },
      logout() {
        uni.removeStorageSync('token')
        uni.removeStorageSync('userInfo')
        this.token = ''
        this.userInfo = {}
        this.$toast(this.tr('mine.logoutSuccess'))
      }
    }
  }
</script>

<style lang="scss">
.mine-shell {
  min-height: 100vh;
  padding: 36rpx 28rpx 48rpx;
}

.toolbar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 28rpx;
}

.toolbar-title {
  font-size: 48rpx;
  line-height: 56rpx;
  font-weight: 600;
  color: var(--text-primary);
}

.toolbar-subtitle {
  margin-top: 10rpx;
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

.info-list,
.menu-list {
  border-radius: 28rpx;
  padding: 8rpx 24rpx;
  margin-bottom: 24rpx;
}

.info-item,
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 92rpx;
  border-bottom: 1rpx solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
}

.info-item {
  .label {
    color: var(--text-secondary);
  }

  .value {
    max-width: 60%;
    text-align: right;
    color: var(--text-primary);
  }
}

.menu-title {
  color: var(--text-primary);
  font-weight: 600;
}

.menu-desc {
  margin-top: 8rpx;
  color: var(--text-secondary);
}

.menu-arrow {
  color: var(--text-muted);
  font-size: 32rpx;
}

.action-list {
  margin-top: 36rpx;
}

.action-button {
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  border-radius: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
}

.logout-button {
  background: rgba(255, 107, 107, 0.12);
  color: #e45151;
  border: 1rpx solid rgba(228, 81, 81, 0.18);
}
</style>
