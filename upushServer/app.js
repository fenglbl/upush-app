require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const unipush = require('./unipush/index.js')


const dir = './cloudfunctions'
/*
  require function start
  动态导入云函数
*/ 
const fs = require('fs');
const path = require('path');
const cloudfunctions = {};
const files = fs.readdirSync(dir);
files.forEach(functionName=>{
  const filePath = `${dir}/${functionName}/index.js`;
  cloudfunctions[functionName] = require(filePath);
  console.log(`${functionName} cloud function require success`);
})


const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json()) 

app.post('/cloudfunction', async (req, res) => {
  // console.log( req.body);
  if(req.body){
    let { functionName,params,header } = req.body
    if(functionName){
      // console.log(cloudfunctions[functionName]);
      let re = await cloudfunctions[functionName].main(params,{
        CLIENTIP:req.ip,
        CLIENTUA:req.headers['user-agent'],
        APPID:"test",
        deviceId:"test"
      })
      // console.log(req.header);
      res.send({
        result:re
      })
      return
    }
    res.send({
      code:-1,
      error:'functionName is NULL',
    })
  }else{
    res.send({
      code:-1,
      error:'body is NULL',
    })
  }
  
})

app.post('/pushMessage',(req,res)=>{
  if(req.body){
    let pushData = {...req.body}
    pushMessage(pushData,req,res)
  }else{
    res.send({code:202,msg:'参数错误'})
  }
})

app.get('/pushMessage',(req,res)=>{
  if(req.query){
    let pushData = {...req.query}
    pushMessage(pushData,req,res)
  }else{
    res.send({code:202,msg:'参数错误'})
  }
})

app.get('/pushMessage/:id',(req,res)=>{
  if(req.query){
    let pushData = {...req.query}
    if(req.params){
      pushData.id = req.params.id
    }
    pushMessage(pushData,req,res)
  }else{
    res.send({code:202,msg:'参数错误'})
  }
})

async function pushMessage(pushData,req,res){
  
  if(!pushData.id){
    res.send({code:202,msg:'id error'})
    return
  }
  if(!pushData.title){
    res.send({code:202,msg:'title error'})
    return
  }
  if(!pushData.content) pushData.content = ""
  if(!pushData.payload) pushData.payload = ""
  let pushRes =  await cloudfunctions.push.main(pushData,{
    CLIENTIP:req.ip,
    CLIENTUA:req.headers['user-agent'],
    APPID:"test",
    deviceId:"test"
  })
  res.send({code:200,msg:'推送已提交'})
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

