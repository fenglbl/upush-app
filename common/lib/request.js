import _uniCloud from "@/common/lib/cloudfunctions.js"
import { getLocale, t } from '@/common/lib/i18n.js'
import { showNetworkError } from '@/common/lib/app.js'
console.log(_uniCloud);

export default function(name,data){
  return new Promise((resolve, reject) => {
    data = interceptors.request(data)
    _uniCloud.callFunction({
      name:name,
      data:data
    }).then(res=>{
      res = interceptors.response(res)
      resolve(res)
    }).catch(err=>{
      console.log(err);
      showNetworkError(getLocale())
    })
  });
}


const interceptors = {
  // 请求拦截
  request(data = {}){
    let token = uni.getStorageSync('token')
    console.log(data,token);
    if(token){
      data.token = token
    }
    
    return data
  },
  // 响应拦截
  response(res){
    if(res.result.code == 200){
      return res.result
    }else if(res.result.code == 202){
      uni.showToast({
        icon:"none",
        mask:true,
        title:res.result.msg
      })
      setTimeout(()=>{
        uni.navigateTo({
          url:"/pages/login/index"
        })
      },1500)
    }else{
      uni.showToast({
        icon:"none",
        mask:true,
        title:res.result.msg
      })
    }
    
    return res.result
  }
}


