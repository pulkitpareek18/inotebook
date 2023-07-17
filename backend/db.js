const mongoose = require('mongoose')
const mongoUri = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = () =>{
    mongoose.connect(mongoUri)
    .then((res) => {
      console.log("Connected to Mongo Successfully.")
    }).catch((err) => {
        console.log("error"+err)
      });
}

module.exports = connectToMongo;