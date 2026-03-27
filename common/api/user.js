import request from "@/common/lib/request.js"

export default {
  login(data){
    return request('login',data)
  },
  register(data){
    return request('register',data)
  },
  getPushMessage(data){
    return request('getPushMessage',data)
  },
  push(data){
    return request('push',data)
  }
}
