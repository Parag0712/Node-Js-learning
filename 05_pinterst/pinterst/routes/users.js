const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pin-clone")
const userSchema = mongoose.Schema({
  username:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  contact:Number, 
  board:{
    type:Array,
    default:[]
  },
  
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
})


//using plugin password serialize and deserialize function de rhe samje 
// jiss hash password store ho rha 
userSchema.plugin(plm,{usernameField:'email'})

module.exports  = mongoose.model("User",userSchema)