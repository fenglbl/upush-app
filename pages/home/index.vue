<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <view class="home-shell">
      <view class="toolbar">
        <view>
          <view class="toolbar-title">消息中心</view>
          <view class="toolbar-subtitle">实时查看设备接收到的推送消息</view>
        </view>
        <button class="theme-switch" @click="toggleTheme">{{ themeButtonText }}</button>
      </view>

      <view class="device-id theme-card">
        <view class="label">当前用户 ID</view>
        <view class="cid" @click="copy">{{ uid }}</view>
      </view>

      <view class="list" v-if="token">
        <view class="list-item theme-card" v-for="(item, index) of list" :key="index">
          <view class="title"><view>{{ item.title }}</view></view>
          <view class="content" v-html="item.content"></view>
          <view class="time">{{ item.create_time | getTime }}</view>
        </view>
        <view class="nomore" v-if="page >= total">已加载全部数据</view>
      </view>

      <view v-else class="empty-state theme-card">
        <view class="empty-title">当前未登录</view>
        <view class="empty-desc">登录后可查看推送消息记录，并实时接收新的消息提醒。</view>
        <button class="login-button theme-primary-button" @click="navTo">去登录</button>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        token: "",
        uid: "",
        page: 1,
        total: 1,
        theme: 'light'
      }
    },
    onLoad() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
      let userInfo = uni.getStorageSync('userInfo') || {}
      this.uid = userInfo.id || ''
    },
    onShow() {
      this.theme = uni.getStorageSync('appTheme') || 'light'
      this.applyNavTheme()
      this.token = uni.getStorageSync('token')
      if (this.token) {
        this.page = 1
        this.init()
        uni.startPullDownRefresh()
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
      themeButtonText() {
        return this.theme === 'dark' ? '日间模式' : '夜间模式'
      }
    },
    methods: {
      toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark'
        uni.setStorageSync('appTheme', this.theme)
        this.applyNavTheme()
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
      push() {
        this.$apis.user.push({ id: '687ba27b7afc5034100a83f0', title: '测试', content: `fa测试测试测试测试fa<br><span style="color:red;">fefe</span>` })
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
      content: "";
      display: inline-block;
      width: 80rpx;
      height: 2rpx;
      background-color: var(--text-muted);
      margin-left: 20rpx;
    }

    &::before {
      content: "";
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
