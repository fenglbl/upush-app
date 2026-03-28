<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="mine-shell">
      <app-navbar :title="tr('mine.navTitle')" :theme="theme" :autoBack="false" :showBack="false"></app-navbar>
      <view class="toolbar-subtitle">{{ tr('mine.subtitle') }}</view>

      <view class="profile-card theme-card">
        <view class="avatar">{{ avatarText }}</view>
        <view class="profile-main">
          <view class="nickname">{{ displayName }}</view>
          <view class="hint">{{ token ? tr('mine.userId') + ': ' + displayId : tr('mine.loginHint') }}</view>
        </view>
      </view>

      <view class="section-title">{{ tr('mine.accountInfo') }}</view>
      <uv-cell-group class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); border: 1rpx solid var(--border-color); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('mine.nickname')" :value="userInfo.nickname || '--'" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('mine.username')" :value="userInfo.username || '--'" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('mine.userId')" :value="userInfo.id || '--'" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
        <uv-cell :title="tr('mine.languageLabel')" :value="locale === 'zh' ? tr('setting.chinese') : tr('setting.english')" :border="false" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle"></uv-cell>
      </uv-cell-group>

      <uv-cell-group class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 28rpx; background: var(--surface-bg); border: 1rpx solid var(--border-color); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('mine.settingEntry')"
          :label="tr('mine.settingHint')"
          isLink
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="goSetting"
        ></uv-cell>
      </uv-cell-group>

      <view class="action-list">
        <uv-button
          v-if="!token"
          type="primary"
          shape="circle"
          size="large"
          customStyle="height: 92rpx;"
          @click="goLogin"
        >{{ tr('common.goLogin') }}</uv-button>
        <uv-button
          v-else
          type="error"
          shape="circle"
          size="large"
          plain
          customStyle="height: 92rpx;"
          @click="logout"
        >{{ tr('common.logout') }}</uv-button>
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
      cellLabelStyle() {
        return {
          color: 'var(--text-secondary)'
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
        this.$applyTabBarI18n(this.locale)
        this.$applyTabBarTheme(this.theme)
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

.toolbar-subtitle {
  margin-bottom: 28rpx;
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

.section-title {
  margin: 8rpx 0 18rpx;
  font-size: 26rpx;
  color: var(--text-secondary);
}

.action-list {
  margin-top: 28rpx;
}

.cell-group :deep(.uv-cell__value) {
  font-weight: 500;
}
</style>
