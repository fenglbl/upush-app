'use strict';
const tokenLong = 1000 * 60 * 60 * 24 * 365 * 100; // 默认100年
exports.main = async (event, context) => {
	//event为客户端上传的参数
  const db = uniCloud.database();
	const pushMsgDB = db.collection("uni-push-message")
  const usersDB = db.collection("uni-id-users")
  const tokenDB = db.collection("token")
  const t = new Date().getTime()
  // 判断token是否过期
  const userToken = await tokenDB.where({token:event.token}).get()
  if(!userToken.affectedDocs){
    return {
      code:202,
      msg:"token不存在",
      data:{}
    }
  }
  let tokenCreateTime = userToken.data[0].addtime
  if(tokenCreateTime + tokenLong < t){
    // 创建数据表token
    return {
      code:202,
      msg:"token过期",
      data:[]
    }
  }
  
  const user = await usersDB.where({token:event.token}).get()
  if(user.affectedDocs){
    let user_id = user.data[0]._id
    let msg = await pushMsgDB.where({
      user_id:user_id,
      device_id:event.device_id
    }).field({
      device_id:false,
      ip:false
    }).orderBy('create_time','desc').get()
    
    return {
      code:200,
      msg:"",
      data:msg.data
    }
  }
	//返回数据给客户端
	return {
    code:202,
    msg:"token异常",
    data:[]
  }
};
