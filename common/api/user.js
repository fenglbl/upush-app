import request from "@/common/lib/request.js"

export default {
  login(data){
    return request('login',data)
  },
  register(data){
    return request('register',data)
  },
  updateProfile(data){
    return request('updateProfile',data)
  },
  getUserInfo(data){
    return request('getUserInfo',data)
  },
  getPushMessage(data){
    return request('getPushMessage',data)
  },
  push(data){
    return request('push',data)
  }
}
