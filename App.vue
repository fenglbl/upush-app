<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
      this.initTheme()
      uni.getPushClientId({
        success: (res) => {
          uni.setStorageSync('cid',res.cid)
        },
        fail(err) {
        }
      })
		},
		onShow: function() {
			console.log('App Show')
			this.initTheme()
		},
		onHide: function() {
			console.log('App Hide')
		},
      methods: {
        initTheme() {
          const savedTheme = uni.getStorageSync('appThemeMode') || uni.getStorageSync('appTheme')
          const systemInfo = uni.getSystemInfoSync()
          const systemTheme = systemInfo.theme === 'dark' ? 'dark' : 'light'
          const themeMode = ['system', 'light', 'dark'].includes(savedTheme) ? savedTheme : (savedTheme || 'system')
          const theme = themeMode === 'system' ? systemTheme : themeMode
          uni.setStorageSync('appThemeMode', themeMode)
          uni.setStorageSync('appTheme', theme)
		}
		}
	}
</script>

<style lang="scss">
  /*每个页面公共css */
  @font-face {
  	font-family: 'PingFang SC';
  	src: url('~@/static/font/pingfang.ttf'); //你的资源目录
  	font-weight: normal;
  	font-style: normal;
  }
  
  page{
    background: #f3f7fb;
    &>view{
      overflow: hidden;
    }
  }
  .theme-page {
    min-height: 100vh;
    padding-bottom: 40rpx;
    transition: background-color .25s ease, color .25s ease;
  }
  .theme-light {
    --page-bg: linear-gradient(180deg, #f5f9ff 0%, #edf3f8 100%);
    --surface-bg: rgba(255, 255, 255, 0.88);
    --surface-strong: #ffffff;
    --text-primary: #17324d;
    --text-secondary: rgba(23, 50, 77, 0.68);
    --text-muted: rgba(23, 50, 77, 0.45);
    --border-color: rgba(35, 76, 120, 0.10);
    --accent-color: #1c8ef5;
    --accent-soft: rgba(28, 142, 245, 0.14);
    --button-text: #ffffff;
    --shadow-color: rgba(31, 77, 122, 0.12);
  }
  .theme-dark {
    --page-bg: linear-gradient(180deg, #0d1722 0%, #101d2b 45%, #132638 100%);
    --surface-bg: rgba(18, 31, 46, 0.88);
    --surface-strong: #172739;
    --text-primary: #eef6ff;
    --text-secondary: rgba(238, 246, 255, 0.74);
    --text-muted: rgba(238, 246, 255, 0.48);
    --border-color: rgba(147, 198, 255, 0.10);
    --accent-color: #54b2ff;
    --accent-soft: rgba(84, 178, 255, 0.20);
    --button-text: #06213b;
    --shadow-color: rgba(0, 0, 0, 0.28);
  }
  .img{
    font-size: 0;
    line-height: 0;
    overflow: hidden;
    image{
      width: 100%;
      height: 100%;
    }
  }
  view,text {
    box-sizing: border-box;
    color: inherit;
    font-size: 24rpx;
    line-height: 34rpx;
    font-family: 'PingFang SC';
  }
  button{
    margin: 0;
    padding: 0;
  }
  button::after{
    border: none;
  }
  .placeholder{
    color: var(--text-muted);
    font-size: 28rpx;
  }
  input{
    text-decoration: none;
    width: 100%;
    color: var(--text-primary);
    &::after{
      border: none;
    }
  }
  .theme-panel {
    position: relative;
    background: var(--page-bg);
    color: var(--text-primary);
  }
  .theme-switch {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 156rpx;
    height: 64rpx;
    border-radius: 999rpx;
    padding: 0 24rpx;
    border: 1rpx solid var(--border-color);
    background: var(--surface-bg);
    color: var(--text-primary);
    box-shadow: 0 18rpx 40rpx -26rpx var(--shadow-color);
  }
  .theme-card {
    background: var(--surface-bg);
    border: 1rpx solid var(--border-color);
    box-shadow: 0 24rpx 60rpx -34rpx var(--shadow-color);
    backdrop-filter: blur(12rpx);
  }
  .theme-primary-button {
    background: linear-gradient(135deg, var(--accent-color) 0%, #3fb2ff 100%);
    color: var(--button-text);
    box-shadow: 0 20rpx 44rpx -24rpx var(--shadow-color);
  }
</style>
