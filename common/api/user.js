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
  checkVersion(data){
    return request('checkVersion',data)
  },
  getAgreement(data){
    return request('getAgreement',data)
  },
  getContactList(data){
    return request('getContactList',data)
  },
  submitFeedback(data){
    return request('submitFeedback',data)
  },
  getPushMessage(data){
    return request('getPushMessage',data)
  },
  push(data){
    return request('push',data)
  }
}
