'use strict';
const uniPush = uniCloud.getPushManager({appId:"__UNI__0805689"}) //注意这里需要传入你的应用appId，用于指定接收消息的客户端
exports.main = async (event, context) =>{
  const ip = context.CLIENTIP
  //event为客户端上传的参数
  let { id, title , content , payload } = event
  const db = uniCloud.database();
  const deviceDB = db.collection("uni-id-device")
  const pushMsgDB = db.collection("uni-push-message")
  const devices = await deviceDB.where({user_id:id}).get()
  devices.data.map(item=>{
    const t = new Date().getTime()
    pushMsgDB.add({
      user_id:item.user_id,
      ip,
      device_id:item.device_id,
      create_time:t,
      title,content,payload
    })
    uniPush.sendMessage({
      "push_clientid":item.device_id,
      "title": title,	
      "content": content,
      "payload": payload
    })
  })
  return {
    code:200,
    msg:"推送请求已提交"
  }
  //返回数据给客户端
}

