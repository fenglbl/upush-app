<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.title')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.subtitle') }}</view>
      </view>

      <view class="section-title">{{ tr('setting.userGroup') }}</view>
      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('setting.profileTitle')"
          :label="tr('setting.profileDesc')"
          isLink
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="goProfileSetting"
        ></uv-cell>

        <uv-cell
          :title="tr('setting.securityTitle')"
          :label="tr('setting.securityDesc')"
          isLink
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="goSecuritySetting"
        ></uv-cell>
      </uv-cell-group>

      <view class="section-title">{{ tr('setting.preferenceGroup') }}</view>
      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('setting.themeTitle')"
          :label="tr('setting.themeDesc')"
          isLink
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="goThemeSetting"
        ></uv-cell>

        <uv-cell
          :title="tr('setting.languageTitle')"
          :label="tr('setting.languageDesc')"
          isLink
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="goLanguageSetting"
        ></uv-cell>
      </uv-cell-group>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        theme: 'light',
        locale: 'zh'
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
        this.applyNavTheme()
      },
      tr(path) {
        return this.$t(path, this.locale)
      },
      goThemeSetting() {
        uni.navigateTo({
          url: '/pages/setting/theme'
        })
      },
      goProfileSetting() {
        uni.navigateTo({
          url: '/pages/setting/profile'
        })
      },
      goSecuritySetting() {
        uni.navigateTo({
          url: '/pages/setting/security'
        })
      },
      goLanguageSetting() {
        uni.navigateTo({
          url: '/pages/setting/language'
        })
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

.section-title {
  margin: 8rpx 0 18rpx;
  font-size: 26rpx;
  color: var(--text-secondary);
}

.cell-group :deep(.uv-cell__label) {
  line-height: 36rpx;
}
</style>
