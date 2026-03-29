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

      <view class="section-title">{{ tr('setting.aboutGroup') }}</view>
      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('setting.aboutUpush')" :label="tr('setting.aboutUpushDesc')" isLink :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="goAboutPage"></uv-cell>
        <uv-cell :title="tr('setting.checkUpdate')" :label="tr('setting.checkUpdateDesc')" isLink :value="versionName" :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="checkVersion"></uv-cell>
        <uv-cell :title="tr('setting.userAgreement')" :label="tr('setting.userAgreementDesc')" isLink :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="goAgreementPage"></uv-cell>
        <uv-cell :title="tr('setting.contactUs')" :label="tr('setting.contactUsDesc')" isLink :border="true" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="goContactPage"></uv-cell>
        <uv-cell :title="tr('setting.feedback')" :label="tr('setting.feedbackDesc')" isLink :border="false" :cellStyle="cellStyle" :titleStyle="cellTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="goFeedbackPage"></uv-cell>
      </uv-cell-group>

      <uv-cell-group :border="false" class="cell-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 24rpx; background: var(--surface-bg); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell :title="tr('setting.logoutEntry')" :label="tr('setting.logoutEntryDesc')" isLink :border="false" :cellStyle="cellStyle" :titleStyle="logoutTitleStyle" :labelStyle="cellLabelStyle" :valueStyle="cellValueStyle" @click="logout"></uv-cell>
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
        versionName: '0.0.1'
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
      },
      logoutTitleStyle() {
        return {
          color: '#e45151',
          fontWeight: '600'
        }
      },
      currentPlatform() {
        // #ifdef APP-PLUS
        return 'app'
        // #endif
        // #ifdef H5
        return 'h5'
        // #endif
        // #ifdef MP-WEIXIN
        return 'mp-weixin'
        // #endif
        return 'app'
      }
    },
    methods: {
      syncState() {
        this.theme = uni.getStorageSync('appTheme') || 'light'
        this.locale = this.$getLocale()
        const accountInfo = uni.getAccountInfoSync && uni.getAccountInfoSync()
        const miniVersion = accountInfo?.miniProgram?.version
        this.versionName = miniVersion || '0.0.1'
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
      goAboutPage() {
        uni.navigateTo({ url: '/pages/setting/about' })
      },
      goAgreementPage() {
        uni.navigateTo({ url: '/pages/setting/agreement' })
      },
      goContactPage() {
        uni.navigateTo({ url: '/pages/setting/contact' })
      },
      goFeedbackPage() {
        uni.navigateTo({ url: '/pages/setting/feedback' })
      },
      async checkVersion() {
        const res = await this.$apis.user.checkVersion({
          versionName: this.versionName,
          platform: this.currentPlatform
        })

        if (res.code !== 200) {
          uni.showToast({
            icon: 'none',
            title: this.tr('setting.updateFailed')
          })
          return
        }

        const info = res.data
        if (!info.hasUpdate) {
          uni.showToast({
            icon: 'none',
            title: this.tr('setting.updateLatest')
          })
          return
        }

        uni.showModal({
          title: this.tr('setting.updateAvailable'),
          content: `${this.tr('setting.currentVersionLabel')}: ${info.currentVersion}\n${this.tr('setting.latestVersionLabel')}: ${info.latestVersion}\n${this.tr('setting.forceUpdateLabel')}: ${info.forceUpdate ? 'Yes' : 'No'}${info.notes ? `\n\n${info.notes}` : ''}`,
          showCancel: !info.forceUpdate,
          confirmText: 'OK'
        })
      },
      logout() {
        uni.showModal({
          title: this.tr('setting.logoutConfirmTitle'),
          content: this.tr('setting.logoutConfirmContent'),
          success: (res) => {
            if (!res.confirm) {
              return
            }
            uni.removeStorageSync('token')
            uni.removeStorageSync('userInfo')
            this.$toast(this.tr('setting.logoutSuccess'), () => {
              uni.switchTab({
                url: '/pages/mine/index'
              })
            })
          }
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
