<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <app-navbar :title="tr('setting.languagePageTitle')" :theme="theme"></app-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.languageDesc') }}</view>
      </view>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('common.followSystem')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="localeMode === 'system' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="localeMode === 'system' ? activeIconStyle : hiddenIconStyle"
          @click="setAppLocaleMode('system')"
        ></uv-cell>
        <uv-cell
          :title="tr('setting.chinese')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="true"
          :cellStyle="cellStyle"
          :titleStyle="localeMode === 'zh' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="localeMode === 'zh' ? activeIconStyle : hiddenIconStyle"
          @click="setAppLocaleMode('zh')"
        ></uv-cell>
        <uv-cell
          :title="tr('setting.english')"
          clickable
          isLink
          rightIcon="checkmark"
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="localeMode === 'en' ? activeTitleStyle : cellTitleStyle"
          :rightIconStyle="localeMode === 'en' ? activeIconStyle : hiddenIconStyle"
          @click="setAppLocaleMode('en')"
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
        locale: 'zh',
        localeMode: 'system'
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
        this.theme = uni.getStorageSync('appTheme') || 'light'
        this.localeMode = uni.getStorageSync('appLocaleMode') || uni.getStorageSync('appLocale') || 'system'
        this.locale = this.$getLocale()
        this.$applyTabBarI18n(this.locale)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
      },
      tr(path) {
        return this.$t(path, this.locale)
      },
      setAppLocaleMode(localeMode) {
        this.locale = this.$setLocaleMode(localeMode)
        this.localeMode = localeMode
        this.$applyTabBarI18n(this.locale)
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
