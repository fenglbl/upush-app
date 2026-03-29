'use strict';

const uniCloud = require('../../db/index.js')

exports.main = async (event) => {
  const db = uniCloud.database()
  const tokenDB = db.collection('token')
  const usersDB = db.collection('uni-id-users')
  const nickname = (event.nickname || '').trim()
  const token = event.token || ''

  if (!token) {
    return {
      code: 202,
      msg: '请先登录',
      data: {}
    }
  }

  if (!nickname) {
    return {
      code: 201,
      msg: '昵称不能为空',
      data: {}
    }
  }

  const tokenInfo = await tokenDB.find({ token }).toArray()
  if (!tokenInfo.length) {
    return {
      code: 202,
      msg: '登录已失效',
      data: {}
    }
  }

  const userId = tokenInfo[0].user_id
  await usersDB.updateOne({ _id: userId }, {
    $set: {
      nickname
    }
  })

  const userInfo = await usersDB.find({ _id: userId }).toArray()
  const user = userInfo[0] || {}

  return {
    code: 200,
    msg: '资料已更新',
    data: {
      id: user._id,
      username: user.username,
      nickname: user.nickname,
      token: user.token || token
    }
  }
}
