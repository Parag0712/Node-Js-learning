const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

},{timestamps:true})

const Category = mongoose.model("Category", categorySchema)
