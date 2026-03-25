import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'


import apis from "@/common/api/index.js"
Vue.prototype.$apis = apis







Vue.prototype.$toast = function(title,fun){
  uni.showToast({
    duration:1500,
    title:title,
    icon:'none',
    mask:true
  })
  setTimeout(fun,1500)
}


// 时间格式化
Date.prototype.Format = function(fmt) {
  const DAY = ['日', '一', '二', '三', '四', '五', '六']
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "H+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds(), //毫秒
    "D": DAY[this.getDay()]
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" +
      o[k]).substr(("" + o[k]).length)));
  return fmt;
}

Vue.filter('getTime',ev=>{
  return new Date(ev).Format('yyyy-MM-dd HH:mm:ss')
})


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif