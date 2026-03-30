'use strict'

const CODE_EXPIRE_MINUTES = Number(process.env.EMAIL_CODE_EXPIRE_MINUTES || 5)

function createEmailCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

async function saveEmailCode(db, { email, code, scene }) {
  const emailCodeDB = db.collection('app_email_code')
  const now = Date.now()
  const expireTime = now + CODE_EXPIRE_MINUTES * 60 * 1000

  await emailCodeDB.updateMany({
    email,
    scene,
    status: 1,
    used: 0
  }, {
    $set: {
      status: 0,
      update_date: now
    }
  })

  await emailCodeDB.insertOne({
    email,
    scene,
    code,
    status: 1,
    used: 0,
    expire_time: expireTime,
    create_date: now,
    update_date: now
  })

  return {
    expireTime
  }
}

async function verifyEmailCode(db, { email, code, scene }) {
  const emailCodeDB = db.collection('app_email_code')
  const now = Date.now()
  const list = await emailCodeDB.find({
    email,
    scene,
    code,
    status: 1,
    used: 0
  }).sort({
    create_date: -1
  }).limit(1).toArray()

  if (!list.length) {
    return {
      valid: false,
      message: '邮箱验证码不正确'
    }
  }

  const record = list[0]
  if (record.expire_time < now) {
    await emailCodeDB.updateOne({ _id: record._id }, {
      $set: {
        status: 0,
        update_date: now
      }
    })

    return {
      valid: false,
      message: '邮箱验证码已过期'
    }
  }

  await emailCodeDB.updateOne({ _id: record._id }, {
    $set: {
      used: 1,
      update_date: now
    }
  })

  return {
    valid: true
  }
}

module.exports = {
  CODE_EXPIRE_MINUTES,
  createEmailCode,
  saveEmailCode,
  verifyEmailCode
}
