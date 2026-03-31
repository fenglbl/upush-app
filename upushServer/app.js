require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/index.js')
const createPushMessageRouter = require('./routes/pushMessage')
const createCloudfunctionRouter = require('./routes/cloudfunction')

const dir = './cloudfunctions'
/*
  require function start
  动态导入云函数
*/
const fs = require('fs')
const cloudfunctions = {}
const files = fs.readdirSync(dir)
files.forEach(functionName => {
  const filePath = `${dir}/${functionName}/index.js`
  cloudfunctions[functionName] = require(filePath)
  console.log(`${functionName} cloud function require success`)
})

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use('/pushMessage', createPushMessageRouter({ cloudfunctions }))
app.use('/cloudfunction', createCloudfunctionRouter({ cloudfunctions }))

app.get('/health', async (req, res) => {
  const database = await db.healthCheck()
  const appStatus = database.status === 'UP' ? 'UP' : 'DEGRADED'

  res.send({
    code: database.status === 'UP' ? 200 : 503,
    msg: database.status === 'UP' ? 'ok' : 'db error',
    data: {
      status: appStatus,
      timestamp: Date.now(),
      uptime: process.uptime(),
      env: process.env.NODE_ENV || 'development',
      database
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
