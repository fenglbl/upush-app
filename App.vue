<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
		},
		onHide: function() {
			console.log('App Hide')
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
    // background-color: #F8F8F8;
    &>view{
      overflow: hidden;
    }
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
    color: #333333;
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
    color: #999999;
    font-size: 28rpx;
  }
  input{
    text-decoration: none;
    width: 100%;
    &::after{
      border: none;
    }
  }
</style>
