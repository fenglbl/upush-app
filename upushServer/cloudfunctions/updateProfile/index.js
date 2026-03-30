'use strict';

const uniCloud = require('../../db/index.js')
const { verifyEmailCode } = require('../_shared/emailCode.js')

exports.main = async (event) => {
  const db = uniCloud.database()
  const tokenDB = db.collection('token')
  const usersDB = db.collection('uni-id-users')
  const nickname = (event.nickname || '').trim()
  const email = (event.email || '').trim().toLowerCase()
  const emailCode = event.email_code || ''
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

  if (email) {
    const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    if (!emailReg.test(email)) {
      return {
        code: 201,
        msg: '邮箱格式不正确',
        data: {}
      }
    }
    const verifyResult = await verifyEmailCode(db, {
      email,
      code: emailCode,
      scene: 'update_email'
    })
    if (!verifyResult.valid) {
      return {
        code: 201,
        msg: verifyResult.message,
        data: {}
      }
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
  if (email) {
    const emailExists = await usersDB.find({ email, _id: { $ne: userId } }).toArray()
    if (emailExists.length) {
      return {
        code: 201,
        msg: '邮箱已存在',
        data: {}
      }
    }
  }
  await usersDB.updateOne({ _id: userId }, {
    $set: {
      nickname,
      ...(email ? { email } : {})
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
      email: user.email || '',
      token: user.token || token
    }
  }
}
