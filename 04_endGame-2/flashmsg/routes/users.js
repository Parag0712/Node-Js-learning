const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/testing2")

const userSchema = mongoose.Schema({
  username:String,
  nickname:String,
  description:String,
  categories:{
    type:Array,
    default:[]
  },
  dateCreated:{
    type:Date,
    default:Date.now()
  }
})


const userModel =  mongoose.model("user",userSchema)

module.exports={userModel}