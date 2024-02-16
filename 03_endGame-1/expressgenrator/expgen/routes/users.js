// install mongoDB
// install mongooseJs
// require and setup connection
// getting-started.js
const mongoose = require('mongoose')
// database creation name:test is db name
//data create this line
mongoose.connect("mongodb://127.0.0.1:27017/test")
// mongodb://localhost:27017
// make schema matlab aapko ye batana banne waala har document sabse choti entity mai kya hoga

//har document ka data kesa hoga
const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number
})

const addressSchema = mongoose.Schema({
    city:String,
    pincode:Number
})
// create Model
// mongoose.model(modelName,Schema)
// test->user>userSchema

//make collection db
addressModel = mongoose.model("address", addressSchema)
userModel = mongoose.model("user", userSchema)

module.exports={addressModel,userModel}
// create model and export

