'use strict';
const md5 = require('md5')
// token有效期长度（单位ms）
const tokenLong = 1000 * 60 * 60 * 24 * 365 * 100; // 默认100年

exports.main = async (event, context) => {
  const ip = context.CLIENTIP
  const ua = context.CLIENTUA
  const deviceId = context.deviceId
  const appid = context.APPID
	//event为客户端上传的参数
  const key = 'fenglbl.upush.'
  const pwd = md5(key + event.password)
	const db = uniCloud.database();
  const tokenDB = db.collection("token")
  const usersDB = db.collection("uni-id-users")
  const nowUser = usersDB.where({username: event.username,password:pwd})
  const loginLogDB = db.collection("uni-id-log")
  const deviceDB = db.collection("uni-id-device")
  const res = await nowUser.get()
  const t = new Date().getTime()
  
  if(res.affectedDocs){
    const userData = res.data[0]
    let token;
    // 验证token是否过期
    const userToken = await tokenDB.where({token:userData.token}).get()
    const tokenCreateTime = userToken.data[0].addtime
    if(tokenCreateTime + tokenLong < t){
      // 创建数据表token
      token = getToken(event.username,event.password,t)
      tokenDB.add({
        user_id:userData._id,
        token:token,
        addtime:t
      })
    }else{
      token = userToken.data[0].token
    }
    
    
    // 设备表
    const devices = await deviceDB.where({device_id:event.cid}).get()
    if(!devices.affectedDocs){
      deviceDB.add({
        user_id:userData._id,
        ua:ua,
        uuid:md5(userData._id + event.cid),
        create_date:t,
        device_id: event.cid,
      })
    }
    // 修改数据
    nowUser.update({
      token:token,
      last_login_date:t,
      last_login_ip:ip,
    })
    // 添加登录日志
    loginLogDB.add({
      create_date:t,
      device_id:deviceId,
      ip:ip,
      state:1,
      type:"login",
      ua:ua,
      user_id:userData._id,
      username:event.username,
      email:"",
      mobile:"",
      appid:appid
    })
    
    return {
      code:200,
      msg:"登录成功",
      data:{
        id:userData._id,
        username:event.username,
        token:token,
        context
      }
    }
  }else{
    loginLogDB.add({
      create_date:t,
      device_id:deviceId,
      ip:ip,
      state:0,
      type:"login",
      ua:ua,
      user_id:"",
      username:event.username,
      email:"",
      mobile:"",
      appid:appid
    })
    return {
      code:201,
      msg:"账号或密码错误",
      data:{}
    }
  }
  
  
	//返回数据给客户端
};


function getToken(un,pw,t){ 
  return md5(`fenglbl.upush.${un}.${pw}.${t}`)
}