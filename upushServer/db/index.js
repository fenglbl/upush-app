const dbConfig = require('./config.js')
const { MongoClient , ObjectId  } = require('mongodb');

const url = `mongodb://${dbConfig.db_user}:${dbConfig.db_password}@${dbConfig.db_host}:${dbConfig.db_port}/?authSource=admin`;
const client = new MongoClient(url);
client.connect().then(res=>{
  console.log('connect db success');
  
});



module.exports = {
  database(){
    return client.db(dbConfig.db_name)
  },
  ObjectId
}