<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="home-shell">
      <app-navbar :title="tr('home.navTitle')" :theme="theme" :autoBack="false" :showBack="false"></app-navbar>
      <view class="toolbar-subtitle">{{ tr('home.subtitle') }}</view>

      <uv-cell-group class="info-group" customStyle="border-radius: 28rpx; overflow: hidden; margin-bottom: 28rpx; background: var(--surface-bg); border: 1rpx solid var(--border-color); box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);">
        <uv-cell
          :title="tr('home.currentUserId')"
          :label="tr('home.tapToCopy')"
          :value="uid || '--'"
          isLink
          :border="false"
          :cellStyle="cellStyle"
          :titleStyle="cellTitleStyle"
          :labelStyle="cellLabelStyle"
          :valueStyle="cellValueStyle"
          @click="copy"
        ></uv-cell>
      </uv-cell-group>

      <view class="list" v-if="token">
        <view class="list-item theme-card" v-for="(item, index) of list" :key="index">
          <view class="title"><view>{{ item.title }}</view></view>
          <view class="content" v-html="item.content"></view>
          <view class="time">{{ formatTime(item.create_time) }}</view>
        </view>
        <uv-load-more v-if="page >= total" status="nomore" :nomoreText="tr('common.loadingAll')"></uv-load-more>
      </view>

      <view v-else class="empty-state theme-card">
        <uv-empty mode="list" :text="tr('home.emptyTitle')"></uv-empty>
        <view class="empty-desc">{{ tr('home.emptyDesc') }}</view>
        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 44rpx;" @click="navTo">{{ tr('common.goLogin') }}</uv-button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        token: '',
        uid: '',
        page: 1,
        total: 1,
        theme: 'light',
        locale: 'zh'
      }
    },
    onLoad() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
      let userInfo = uni.getStorageSync('userInfo') || {}
      this.uid = userInfo.id || ''
    },
    onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
      this.token = uni.getStorageSync('token')
      if (this.token) {
        this.page = 1
        this.init()
        uni.onPushMessage(() => {
          uni.stopPullDownRefresh()
          this.page = 1
          this.init()
        })
      }
    },
    onPullDownRefresh() {
      if (!this.token) {
        uni.stopPullDownRefresh()
        return
      }
      this.page = 1
      this.init()
    },
    onReachBottom() {
      if (this.page < this.total) {
        this.page++
        this.init()
      }
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
          color: 'var(--accent-color)'
        }
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
      init() {
        const cid = uni.getStorageSync('cid')
        this.$apis.user.getPushMessage({ device_id: cid, page: this.page, pageSize: 20 }).then(res => {
          if (this.page == 1) {
            this.list = res.data.list
          } else {
            this.list = [...this.list, ...res.data.list]
          }
          this.total = res.data.total
          uni.stopPullDownRefresh()
        })
      },
      copy() {
        uni.setClipboardData({
          data: this.uid
        })
      },
      navTo() {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      },
      formatTime(value) {
        return this.$formatTime(value)
      }
    }
  }
</script>

<style lang="scss">
.home-shell {
  min-height: 100vh;
  padding: 36rpx 28rpx 48rpx;
}

.toolbar-subtitle {
  margin-bottom: 28rpx;
  color: var(--text-secondary);
}

.list {
  .list-item {
    margin-bottom: 20rpx;
    padding: 0;
    border-radius: 24rpx;

    .title {
      height: 64rpx;
      border-bottom: 2rpx solid var(--border-color);
      font-size: 28rpx;
      line-height: 64rpx;
      padding: 0 24rpx;
      font-weight: bold;
      color: var(--text-primary);
      display: flex;
      align-items: center;

      view {
        width: 27em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
      }
    }

    .content {
      border-bottom: 2rpx solid var(--border-color);
      font-size: 28rpx;
      line-height: 36rpx;
      padding: 24rpx;
      color: var(--text-secondary);
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }

    .time {
      height: 64rpx;
      font-size: 28rpx;
      line-height: 64rpx;
      padding: 0 24rpx;
      color: var(--text-muted);
    }
  }
}

.empty-state {
  margin-top: 120rpx;
  padding: 48rpx 36rpx;
  border-radius: 28rpx;
  text-align: center;
}

.empty-desc {
  margin-top: 18rpx;
  color: var(--text-secondary);
}
</style>
