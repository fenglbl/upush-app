<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="setting-shell">
      <uv-navbar
        :title="tr('setting.title')"
        :autoBack="true"
        :placeholder="true"
        :safeAreaInsetTop="true"
        :bgColor="navBackgroundColor"
        :titleStyle="{ color: navTitleColor }"
        :leftIconColor="navTitleColor"
      ></uv-navbar>

      <view class="toolbar">
        <view class="toolbar-subtitle">{{ tr('setting.subtitle') }}</view>
      </view>

      <view class="section-title">{{ tr('setting.preferenceGroup') }}</view>
      <uv-cell-group customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx;">
        <uv-cell :title="tr('setting.themeTitle')" :label="tr('setting.themeDesc')" :border="false">
          <template #value>
            <view class="cell-actions">
              <uv-button
                size="mini"
                shape="circle"
                :type="theme === 'light' ? 'primary' : 'info'"
                @click.stop="setTheme('light')"
              >{{ tr('setting.light') }}</uv-button>
              <uv-button
                size="mini"
                shape="circle"
                :type="theme === 'dark' ? 'primary' : 'info'"
                @click.stop="setTheme('dark')"
              >{{ tr('setting.dark') }}</uv-button>
            </view>
          </template>
        </uv-cell>
        <uv-cell :title="tr('setting.languageTitle')" :label="tr('setting.languageDesc')" :border="false">
          <template #value>
            <view class="cell-actions">
              <uv-button
                size="mini"
                shape="circle"
                :type="locale === 'zh' ? 'primary' : 'info'"
                @click.stop="setAppLocale('zh')"
              >{{ tr('setting.chinese') }}</uv-button>
              <uv-button
                size="mini"
                shape="circle"
                :type="locale === 'en' ? 'primary' : 'info'"
                @click.stop="setAppLocale('en')"
              >{{ tr('setting.english') }}</uv-button>
            </view>
          </template>
        </uv-cell>
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
      navBackgroundColor() {
        return this.theme === 'dark' ? '#0f1d2c' : '#f5f9ff'
      },
      navTitleColor() {
        return this.theme === 'dark' ? '#ffffff' : '#17324d'
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
      setTheme(theme) {
        this.theme = theme
        uni.setStorageSync('appTheme', theme)
        this.$applyTabBarTheme(this.theme)
        this.applyNavTheme()
      },
      setAppLocale(locale) {
        this.locale = this.$setLocale(locale)
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

.section-title {
  margin: 8rpx 0 18rpx;
  font-size: 26rpx;
  color: var(--text-secondary);
}

.cell-actions {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
</style>
