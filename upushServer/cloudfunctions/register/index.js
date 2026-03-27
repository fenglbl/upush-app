'use strict';

const md5 = require('md5')
const uniCloud = require('../../db/index.js')

exports.main = async (event) => {
  const db = uniCloud.database()
  const usersDB = db.collection('uni-id-users')
  const t = Date.now()
  const key = 'fenglbl.upush.'
  const username = (event.username || '').trim()
  const password = event.password || ''

  if (!username) {
    return {
      code: 201,
      msg: '账号不能为空',
      data: {}
    }
  }

  if (!password) {
    return {
      code: 201,
      msg: '密码不能为空',
      data: {}
    }
  }

  if (password.length < 6) {
    return {
      code: 201,
      msg: '密码至少 6 位',
      data: {}
    }
  }

  const exists = await usersDB.find({ username }).toArray()
  if (exists.length) {
    return {
      code: 201,
      msg: '账号已存在',
      data: {}
    }
  }

  const pwd = md5(key + password)
  await usersDB.insertOne({
    username,
    password: pwd,
    token: '',
    create_date: t,
    register_date: t,
    nickname: username,
    status: 0
  })

  return {
    code: 200,
    msg: '注册成功',
    data: {
      username
    }
  }
}
