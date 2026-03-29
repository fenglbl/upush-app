<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.appearancePageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.themeDesc') }}</view>
      </view>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('common.followSystem')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="themeMode === 'system' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="themeMode === 'system' ? activeIconStyle : hiddenIconStyle"
          @click="setThemeMode('system')"
        ></uv-cell>
        <uv-cell
          :title="tr('setting.light')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="themeMode === 'light' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="themeMode === 'light' ? activeIconStyle : hiddenIconStyle"
          @click="setThemeMode('light')"
        ></uv-cell>
        <uv-cell
          :title="tr('setting.dark')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="themeMode === 'dark' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="themeMode === 'dark' ? activeIconStyle : hiddenIconStyle"
          @click="setThemeMode('dark')"
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
        themeMode: 'system',
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
      activeTitleStyle() {
        return {
          color: 'var(--accent-color)',
          fontWeight: '700'
        }
      },
      activeIconStyle() {
        return {
          color: 'var(--accent-color)'
        }
      },
      hiddenIconStyle() {
        return {
          color: 'transparent'
        }
      }
    },
    methods: {
      syncState() {
        const systemInfo = uni.getSystemInfoSync()
        const systemTheme = systemInfo.theme === 'dark' ? 'dark' : 'light'
        this.themeMode = uni.getStorageSync('appThemeMode') || uni.getStorageSync('appTheme') || 'system'
        this.theme = this.themeMode === 'system' ? systemTheme : this.themeMode
        this.locale = this.$getLocale()
        this.$applyTabBarI18n(this.locale)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
      },
      tr(path) {
        return this.$t(path, this.locale)
      },
      setThemeMode(mode) {
        const systemInfo = uni.getSystemInfoSync()
        const systemTheme = systemInfo.theme === 'dark' ? 'dark' : 'light'
        this.themeMode = mode
        this.theme = mode === 'system' ? systemTheme : mode
        uni.setStorageSync('appThemeMode', mode)
        uni.setStorageSync('appTheme', this.theme)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
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
</style>
