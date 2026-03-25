<template>
  <view>
    <!-- <button @click="push">推送</button> -->
    <view class="device-id">
      <view class="cid" @click="copy">{{uid}}</view>
    </view>
    <view class="list" v-if="token">
      <view class="list-item" v-for="(item,index) of list" :key="index">
        <view class="title"><view>{{item.title}}</view></view>
        <view class="content" v-html="item.content"></view>
        <view class="time">{{item.create_time | getTime}}</view>
      </view>
      <view class="nomore" v-if="this.page >= this.total">已加载全部数据</view>
    </view>
    <view v-else>
      <button class="login-button" @click="navTo">去登录</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        list:[],
        token:"",
        uid:"",
        page:1,
        total:1
      };
    },
    onLoad() {
      let userInfo = uni.getStorageSync('userInfo')
      this.uid = userInfo.id
    },
    onShow() {
      this.token = uni.getStorageSync('token')
      if(this.token){
        this.page = 1
        this.init()
        uni.onPushMessage((res)=>{
          const data = res.data
          uni.stopPullDownRefresh()
          this.page = 1
          this.init()
        })
      }
    },
    onPullDownRefresh() {
      this.page = 1
      this.init()
    },
    onReachBottom() {
      if(this.page < this.total){
        this.page ++
        this.init()
      }
    },
    methods:{
      init(){
        const cid = uni.getStorageSync('cid')
        this.$apis.user.getPushMessage({device_id:cid,page:this.page,pageSize:20}).then(res=>{
          if(this.page == 1){
            this.list = res.data.list
          }else{
            this.list = [...this.list,...res.data.list]
          }
          this.total = res.data.total
          uni.stopPullDownRefresh()
        })
      },
      push(){
        this.$apis.user.push({id:'687ba27b7afc5034100a83f0',title:'测试',content:`fa测试测试测试测试fa<br><span style="color:red;">fefe</span>`})
      },
      copy(){
        uni.setClipboardData({
          data:this.uid
        })
      },
      navTo(){
        uni.navigateTo({
          url:"/pages/index/index"
        })
      }
    }
  }
</script>

<style lang="scss">
.device-id{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  .cid{
    color: #009dff;
    border-bottom: 1rpx solid #009dff;
  }
}
.list{
  padding: 24rpx;
  .list-item{
    margin-bottom: 20rpx;
    box-shadow: 0 0 14rpx -8rpx #bfbfbf;
    border-radius: 18rpx;
    .title{
      height: 64rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.06);
      font-size: 28rpx;
      line-height: 64rpx;
      padding: 0 24rpx;
      font-weight: bold;
      color: #333333;
      display: flex;
      align-items: center;
      view{
        width: 27em; /* 必须设置固定宽度 */
        white-space: nowrap; /* 禁止换行 */
        overflow: hidden; /* 隐藏溢出内容 */
        text-overflow: ellipsis; /* 显示省略号 */
        display: inline-block; /* 需要设置为块级元素 */
      }
    }
    .content{
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.06);
      font-size: 28rpx;
      line-height: 36rpx;
      padding: 24rpx;
      color: #333333;
      overflow-wrap: break-word;
      white-space: pre-wrap;
    }
    .time{
      height: 64rpx;
      font-size: 28rpx;
      line-height: 64rpx;
      padding: 0 24rpx;
      color: rgba(0, 0, 0, .4);
    }
  }
  .nomore{
    padding: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, .4);
    &::after{
      content: "";
      display: inline-block;
      width: 80rpx;
      height: 2rpx;
      background-color: rgba(0, 0, 0, .4);
      margin-left: 20rpx;
    }
    &::before{
      content: "";
      display: inline-block;
      width: 80rpx;
      height: 2rpx;
      background-color: rgba(0, 0, 0, .4);
      margin-right: 20rpx;
    }
  }
}
.login-button{
  margin: 0 auto;
  margin-top: 120rpx;
  width: 480rpx;
  border-radius: 18rpx;
  background-color: #009dff;
  color: #FFFFFF;
}
</style>
