<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="home-shell">
      <view class="toolbar">
        <view>
          <view class="toolbar-title">{{ tr('home.title') }}</view>
          <view class="toolbar-subtitle">{{ tr('home.subtitle') }}</view>
        </view>
      </view>

      <view class="device-id theme-card">
        <view class="label">{{ tr('home.currentUserId') }}</view>
        <view class="cid" @click="copy">{{ uid }}</view>
      </view>

      <view class="list" v-if="token">
        <view class="list-item theme-card" v-for="(item, index) of list" :key="index">
          <view class="title"><view>{{ item.title }}</view></view>
          <view class="content" v-html="item.content"></view>
          <view class="time">{{ formatTime(item.create_time) }}</view>
        </view>
        <view class="nomore" v-if="page >= total">{{ tr('common.loadingAll') }}</view>
      </view>

      <view v-else class="empty-state theme-card">
        <view class="empty-title">{{ tr('home.emptyTitle') }}</view>
        <view class="empty-desc">{{ tr('home.emptyDesc') }}</view>
        <button class="login-button theme-primary-button" @click="navTo">{{ tr('common.goLogin') }}</button>
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
      this.applyNavTheme()
      let userInfo = uni.getStorageSync('userInfo') || {}
      this.uid = userInfo.id || ''
    },
    onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
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

.device-id {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 148rpx;
  padding: 28rpx 30rpx;
  border-radius: 28rpx;
  margin-bottom: 28rpx;

  .label {
    color: var(--text-secondary);
    margin-bottom: 14rpx;
  }

  .cid {
    display: inline-flex;
    align-items: center;
    color: var(--accent-color);
    border-bottom: 1rpx solid var(--accent-color);
    font-size: 28rpx;
  }
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

  .nomore {
    padding: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);

    &::after {
      content: '';
      display: inline-block;
      width: 80rpx;
      height: 2rpx;
      background-color: var(--text-muted);
      margin-left: 20rpx;
    }

    &::before {
      content: '';
      display: inline-block;
      width: 80rpx;
      height: 2rpx;
      background-color: var(--text-muted);
      margin-right: 20rpx;
    }
  }
}

.empty-state {
  margin-top: 120rpx;
  padding: 48rpx 36rpx;
  border-radius: 28rpx;
  text-align: center;
}

.empty-title {
  font-size: 36rpx;
  font-weight: 600;
  color: var(--text-primary);
}

.empty-desc {
  margin-top: 18rpx;
  color: var(--text-secondary);
}

.login-button {
  margin: 44rpx auto 0;
  width: 100%;
  height: 92rpx;
  line-height: 92rpx;
  border-radius: 22rpx;
  font-size: 30rpx;
  font-weight: 600;
}
</style>
