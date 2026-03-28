import { getBaseUrl } from '@/common/lib/env.js'

export default {
  callFunction(params){
    return new Promise((resolve,reject)=>{
      uni.request({
        url:`${getBaseUrl()}/cloudfunction`,
        method:"POST",
        data:{
          functionName:params.name,
          params:params.data,
          header:{}
        },
        success: (res) => {
          resolve(res.data)
        },
        fail() {
          reject()
        }
      })
    })
  }
}
