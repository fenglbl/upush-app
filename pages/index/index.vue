<template>
	<view class="content">
    <view class="logo-box">
      <image class="logo" src="/static/upush_logo.png"></image>
      <text class="logo-text">登录</text>
    </view>
    <view>
      <view class="input-box"><input class="input" type="text" placeholder="输入账号" v-model="username" /></view>
      <view class="input-box"><input class="input" type="text" placeholder="输入密码" v-model="password" password /></view>
    </view>
    <view  class="reg">还没有账号？<text class="link">注册</text></view>
    <button class="button" @click="login">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        username:"",
        password:"",
        cid:"",
			}
		},
		onLoad() {
      // let token = uni.getStorageSync('token')
      // if(token){
      //   uni.reLaunch({
      //     url:'/pages/index/home'
      //   })
      // }
		},
		methods: {
      async login(){
        if(!this.username){
          return
        }
        if(!this.password){
          return
        }
        const cid = uni.getStorageSync('cid')
        let user = await this.$apis.user.login({
            username:this.username,
            password:this.password,
            cid:cid
        })
        if(user.code == 200){
          uni.setStorageSync('userInfo',user.data)
          uni.setStorageSync('token',user.data.token)
          this.$toast(user.msg,()=>{
            uni.reLaunch({
              url:'/pages/index/home'
            })
          })
        }
      }
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    .logo-box{
      margin-top: 200rpx;
      width: 480rpx;
      display: flex;
      align-items: center;
      .logo {
      	height: 160rpx;
      	width: 160rpx;
      	margin-bottom: 50rpx;
        border-radius: 16rpx  ;
        overflow: hidden;
        box-shadow: 0 0 12rpx 0 #dfdfdf;
      }
      .logo-text{
        font-size: 68rpx;
        padding-left: 38rpx;
        line-height: 68rpx;
      }
    }
    
    .input-box{
      margin-top: 20rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.06);
      .input{
        height: 100rpx;
        padding: 0 16rpx;
        width: 480rpx;
      }
    }
    
    .reg{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-top: 40rpx;
      width: 480rpx;
      .link{
        color: #009dff;
      }
    }
    .button{
      margin-top: 160rpx;
      width: 480rpx;
      border-radius: 30rpx;
      background-color: #009dff;
      color: #ffffff;
      &.button-hover{
        background-color: rgba(0, 157, 255, 0.6);
      }
    }
	}

	

</style>
