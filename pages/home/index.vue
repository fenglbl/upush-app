<template>
  <view class="theme-page theme-panel" :class="themeClass">
    <uv-loading-page :loading="loading" :loadingText="tr('common.loading')" :bgColor="loadingBgColor" color="#8fa2b8"
      loadingColor="#54b2ff"></uv-loading-page>

    <view class="home-shell">
      <app-navbar :title="tr('home.navTitle')" :theme="theme" :autoBack="false" :showBack="false"></app-navbar>
      <view class="toolbar-subtitle">{{ tr('home.subtitle') }}</view>

      <view class="list" v-if="token">
        <view
          class="list-item theme-card"
          :id="getMessageDomId(item)"
          :class="{ 'list-item--highlight': highlightedMid && getMessageId(item) === highlightedMid }"
          v-for="(item, index) of list"
          :key="getMessageId(item) || index"
        >
          <view class="title">
            <view>{{ item.title }}</view>
          </view>
          <view class="content" v-html="item.content"></view>
          <view class="time">{{ formatTime(item.create_time) }}</view>
        </view>
        <uv-load-more v-if="page >= total" status="nomore" :nomoreText="tr('common.loadingAll')"></uv-load-more>
      </view>

      <view v-else class="empty-state theme-card">
        <uv-empty mode="list" :text="tr('home.emptyTitle')"></uv-empty>
        <view class="empty-desc">{{ tr('home.emptyDesc') }}</view>
        <uv-button type="primary" shape="circle" size="large" customStyle="height: 92rpx; margin-top: 44rpx;"
          @click="navTo">{{ tr('common.goLogin') }}</uv-button>
      </view>
    </view>
  </view>
</template>

<script>
import { resolveTheme } from '@/common/lib/theme.js'

  export default {
    data() {
      return {
        list: [],
        token: '',
        uid: '',
        page: 1,
        total: 1,
        loading: false,
        isRefreshing: false,
        hasLoadedOnce: false,
        theme: 'light',
        locale: 'zh',
        highlightedMid: '',
        highlightTimer: null
      }
    },
    onLoad() {
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
      let userInfo = uni.getStorageSync('userInfo') || {}
      this.uid = userInfo.id || ''
    },
    onShow() {
      this.theme = resolveTheme()
      this.locale = this.$getLocale()
      this.$applyTabBarI18n(this.locale)
      this.$applyTabBarTheme(this.theme)
      this.applyNavTheme()
      this.token = uni.getStorageSync('token')

      const pendingPushNavigation = uni.getStorageSync('pendingPushNavigation') || null
      if (pendingPushNavigation) {
        uni.removeStorageSync('pendingPushNavigation')
      }

      if (this.token) {
        this.page = 1
        this.init({ highlightMid: pendingPushNavigation && pendingPushNavigation.mid ? String(pendingPushNavigation.mid) : '' })
      }
    },
    onPullDownRefresh() {
      if (!this.token) {
        uni.stopPullDownRefresh()
        return
      }
      this.isRefreshing = true
      this.page = 1
      this.init()
    },
    onReachBottom() {
      if (this.page < this.total) {
        this.page++
        this.init()
      }
    },
    beforeUnmount() {
      this.clearHighlightTimer()
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
      },
      loadingBgColor() {
        return this.theme === 'dark' ? 'rgba(13, 23, 34, 0.88)' : 'rgba(245, 249, 255, 0.92)'
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
      init(options = {}) {
        const cid = uni.getStorageSync('cid')
        const shouldShowPageLoading = this.page === 1 && !this.hasLoadedOnce && !this.isRefreshing
        if (shouldShowPageLoading) {
          this.loading = true
        }
        this.$apis.user.getPushMessage({
          device_id: cid,
          page: this.page,
          pageSize: 20
        }).then(res => {
          if (this.page == 1) {
            this.list = res.data.list
          } else {
            this.list = [...this.list, ...res.data.list]
          }
          this.total = res.data.total
          this.hasLoadedOnce = true
          this.tryHighlightMessage(options.highlightMid)
          uni.stopPullDownRefresh()
        }).finally(() => {
          this.isRefreshing = false
          this.loading = false
        })
      },
      getMessageId(item) {
        if (!item || typeof item !== 'object') return ''
        return String(item.id || '')
      },
      getMessageDomId(item) {
        const id = this.getMessageId(item)
        return id ? `message-${id}` : ''
      },
      scrollToMessage(mid) {
        const target = String(mid || '')
        if (!target) return

        const selector = `#message-${target}`
        setTimeout(() => {
          uni.pageScrollTo({
            selector,
            duration: 300,
            offsetTop: 88
          })
        }, 80)
      },
      tryHighlightMessage(mid) {
        if (!mid) return
        const target = String(mid)
        const matched = this.list.find((item) => this.getMessageId(item) === target)
        if (!matched) return

        this.highlightedMid = target
        this.scrollToMessage(target)
        this.clearHighlightTimer()
        this.highlightTimer = setTimeout(() => {
          this.highlightedMid = ''
          this.highlightTimer = null
        }, 2000)
      },
      clearHighlightTimer() {
        if (this.highlightTimer) {
          clearTimeout(this.highlightTimer)
          this.highlightTimer = null
        }
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
      transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease, background-color .25s ease;

      &.list-item--highlight {
        border: 2rpx solid var(--accent-color);
        box-shadow: 0 0 0 6rpx var(--accent-soft), 0 24rpx 60rpx -34rpx var(--shadow-color);
        transform: translateY(-2rpx);
      }

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

