export default {
  callFunction(params){
    return new Promise((resolve,reject)=>{
      uni.request({
        url:"http://110.185.163.31:3000/cloudfunction",
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